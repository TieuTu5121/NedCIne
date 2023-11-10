package com.nthao.nedcine.service.impl;


import com.nthao.nedcine.dto.order.OrderRequestCreateDto;
import com.nthao.nedcine.dto.order.OrderResponseDto;
import com.nthao.nedcine.dto.showtime.ShowtimeBookingResponseDto;
import com.nthao.nedcine.dto.showtime.ShowtimeRequestBookingDto;
import com.nthao.nedcine.entity.*;

import com.nthao.nedcine.repository.*;

import com.nthao.nedcine.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    TicketRepsitory ticketRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    ProductOrderInfoRepository productOrderInfoRepository;
    @Autowired
    ShowtimeRepository showtimeRepository;
    @Autowired
    SeatSettingRepository seatSettingRepository;
    @Autowired
    UserRepository userRepository;
 @Autowired
 SeatRepository seatRepository;
    public OrderResponseDto orderMapper(Order order) {
        List<Ticket> tickets = new ArrayList<>();
        List<ProductOrderInfo> productOrderInfos = new ArrayList<>();
        List<Seat> seats = new ArrayList<>();
        Showtime showtime = new Showtime();
        tickets = ticketRepository.findAllByOrOrderId(order.getId());
        for (Ticket ticket : tickets) {
            SeatSetting seatSetting1 = seatSettingRepository.getById(ticket.getSeatSettingId());
            Seat seat = seatRepository.findById((int)seatSetting1.getSeatId()).get();
            showtime = showtimeRepository.findById((int) seatSetting1.getShowtimeId()).get();
            seats.add((seat));
        }
        productOrderInfos = productOrderInfoRepository.findAllByOrderId(order.getId());
        return new OrderResponseDto()
                .builder()
                .id(order.getId())
                .user(userRepository.findById( order.getUserId()).get())
                .tickets(tickets)
                .productOrderInfos(productOrderInfos)
                .showtime(showtime)
                .discount(order.getDiscount())
                .createdAt(order.getCreatedAt())
                .seats(seats)
                .state(order.getState())
                .total(order.getTotal())
                .build();

    }

    @Override
    public List<OrderResponseDto> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        List<OrderResponseDto> orderResponseDtos = new ArrayList<>();
        for (Order order : orders) {
            orderResponseDtos.add(orderMapper(order));
        }
        return orderResponseDtos;
    }



    @Override
    public OrderResponseDto updateOrder(long id, OrderRequestCreateDto orderRequestDto) {
        Order existingOrder = orderRepository.findById(id).orElse(null);
        if (existingOrder != null) {
            // Trước hết, xóa tất cả các thông tin sản phẩm và vé cũ
            List<Ticket> existingTickets = ticketRepository.findAllByOrOrderId(id);
            List<ProductOrderInfo> existingProductOrderInfos = productOrderInfoRepository.findAllByOrderId(id);
            ticketRepository.deleteAll(existingTickets);
            productOrderInfoRepository.deleteAll(existingProductOrderInfos);

            // Cập nhật đơn hàng
            existingOrder.setUserId(orderRequestDto.getUserId());
            existingOrder.setCreatedAt(orderRequestDto.getCreatedAt());
            existingOrder.setState("PAID");
            orderRepository.save(existingOrder);

            // Tạo danh sách mới cho thông tin sản phẩm và vé
            List<Ticket> newTickets = new ArrayList<>();
            List<ProductOrderInfo> newProductOrderInfos = new ArrayList<>();

            // Cập nhật thông tin sản phẩm
            for (ProductOrderInfo productOrderInfo : orderRequestDto.getProductOrderInfos()) {
                Product product = productRepository.findById(productOrderInfo.getProductId()).orElse(null);
                if (product != null) {
                    ProductOrderInfo newProductOrderInfo = new ProductOrderInfo()
                            .builder()
                            .orderId(id)
                            .productId(productOrderInfo.getProductId())
                            .quantity(productOrderInfo.getQuantity())
                            .total(product.getPrice() * productOrderInfo.getQuantity())
                            .build();
                    newProductOrderInfos.add(newProductOrderInfo);
                }
            }

            // Cập nhật thông tin vé và tính tổng giá trị
            float totalOfOrder = 0;
            for (SeatSetting seatSetting : orderRequestDto.getSeatSettings()) {
                Showtime showtime = showtimeRepository.findById((int)seatSetting.getShowtimeId()).orElse(null);
                if (showtime != null) {
                    float priceOfSeat = showtime.getPrice();
                    seatSetting.setStatus("BOOKED");
                    seatSettingRepository.save(seatSetting);
                    Ticket newTicket = new Ticket()
                            .builder()
                            .orderId(id)
                            .price(priceOfSeat)
                            .seatSettingId(seatSetting.getId())
                            .build();
                    newTickets.add(newTicket);
                    totalOfOrder += newTicket.getPrice();
                }
            }

            // Lưu thông tin sản phẩm và vé mới
            ticketRepository.saveAll(newTickets);
            productOrderInfoRepository.saveAll(newProductOrderInfos);

            // Cập nhật tổng giá trị đơn hàng
            existingOrder.setTotal(totalOfOrder);
            orderRepository.save(existingOrder);

            return orderMapper(existingOrder);
        }
        return null;
    }

    @Override
    public List<OrderResponseDto> getOrderByUser(long userId) {
        List<Order> orders = orderRepository.findOrdersByUserId(userId);
        List<OrderResponseDto> orderResponseDtos = new ArrayList<>();
        for (Order order : orders) {
            orderResponseDtos.add(orderMapper(order));
        }
        return orderResponseDtos;
    }

    @Override
    public OrderResponseDto getOrderById(long id) {
        Order order = orderRepository.findById(id).get();
        if(order != null)
        return orderMapper(order);
        return null;
    }


    @Override
    public void deleteOrder(long id) {
        Order order = orderRepository.findById(id).get();
        if (order != null) {
            // Tìm tất cả các ghế trong đơn hàng
            List<Ticket> tickets = ticketRepository.findAllByOrOrderId(id);

            // Set trạng thái của tất cả các ghế trong đơn hàng thành AVAILABLE
            for (Ticket ticket : tickets) {
                long seatSettingId = ticket.getSeatSettingId();
                SeatSetting seatSetting = seatSettingRepository.getById(seatSettingId);
                seatSetting.setStatus("AVAILABLE");
                seatSettingRepository.save(seatSetting);
            }

            // Xóa tất cả các vé trong đơn hàng
            ticketRepository.deleteAll(tickets);

            // Tìm tất cả các thông tin sản phẩm trong đơn hàng
            List<ProductOrderInfo> productOrderInfos = productOrderInfoRepository.findAllByOrderId(id);

            // Xóa tất cả các thông tin sản phẩm trong đơn hàng
            productOrderInfoRepository.deleteAll(productOrderInfos);

            // Xóa đơn hàng
            orderRepository.deleteById(id);
        } else throw new RuntimeException("This order is not exist!!");
    }


    @Override
    public OrderResponseDto createOrder(OrderRequestCreateDto orderRequestDto) {
        float totalOfOrder = 0;
        Showtime showtime = new Showtime();
        Order order = orderRepository.save(new Order()
                .builder()
                .userId(orderRequestDto.getUserId())
                .createdAt(orderRequestDto.getCreatedAt())
                .state("PAID")
                .build());

        List<Ticket> tickets = new ArrayList<>();
        for (SeatSetting seatSetting : orderRequestDto.getSeatSettings()) {
            showtime = showtimeRepository.findById((int) seatSetting.getShowtimeId()).get();
            float priceOfSeat = showtime.getPrice();
            seatSetting.setStatus("BOOKED");
            seatSettingRepository.save(seatSetting);
            Ticket newTicket = new Ticket()
                    .builder()
                    .orderId(order.getId())
                    .price(priceOfSeat)
                    .seatSettingId(seatSetting.getId())
                    .build();
            tickets.add(newTicket);
            totalOfOrder += newTicket.getPrice();
        }
        ticketRepository.saveAll(tickets);
        List<ProductOrderInfo> productOrderInfos = new ArrayList<>();

        for (ProductOrderInfo productOrderInfo : orderRequestDto.getProductOrderInfos()) {
            Product product = productRepository.findById(productOrderInfo.getProductId()).get();
            ProductOrderInfo newProductOrderInfo = productOrderInfoRepository.save(new ProductOrderInfo()
                    .builder()
                    .orderId(order.getId())
                    .productId((long) productOrderInfo.getProductId())
                    .quantity(productOrderInfo.getQuantity())
                    .total(product.getPrice() * productOrderInfo.getQuantity())
                    .build());
            productOrderInfos.add(newProductOrderInfo);
            totalOfOrder += newProductOrderInfo.getTotal();
        }

        order.setTotal(totalOfOrder);
        orderRepository.save(order);
        return orderMapper(order);

    }
}
