package com.nthao.nedcine.service;

import com.nthao.nedcine.dto.order.OrderRequestCreateDto;
import com.nthao.nedcine.dto.order.OrderResponseDto;
import com.nthao.nedcine.dto.product.ProductRequestDto;
import com.nthao.nedcine.dto.product.ProductResponseDto;
import com.nthao.nedcine.dto.showtime.ShowtimeBookingResponseDto;
import com.nthao.nedcine.dto.showtime.ShowtimeRequestBookingDto;
import com.nthao.nedcine.dto.showtime.ShowtimeResponseDto;

import java.util.List;

public interface OrderService {
    public List<OrderResponseDto> getAllOrders();
    public OrderResponseDto createOrder(OrderRequestCreateDto orderResponseDto, String orderStatus);

    public OrderResponseDto updateOrder(long id, OrderRequestCreateDto order);
    public List<OrderResponseDto> getOrderByUser(long userId);
    public OrderResponseDto getOrderById(long id);
    public void deleteOrder(long id) ;
}
