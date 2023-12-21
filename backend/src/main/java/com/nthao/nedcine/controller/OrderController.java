package com.nthao.nedcine.controller;

import com.nthao.nedcine.config.VNPayConfig;
import com.nthao.nedcine.dto.order.OrderRequestCreateDto;
import com.nthao.nedcine.dto.order.OrderResponseDto;
import com.nthao.nedcine.dto.order.PaymentOrderDtoResponse;
import com.nthao.nedcine.dto.showtime.ShowtimeResponseDto;
import com.nthao.nedcine.entity.*;
import com.nthao.nedcine.repository.*;
import com.nthao.nedcine.service.EmailService;
import com.nthao.nedcine.service.OrderService;
import com.nthao.nedcine.util.PageDataResponse;
import com.nthao.nedcine.util.PageResponse;
import com.nthao.nedcine.util.Response;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;

import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.websocket.server.PathParam;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping ("/api/v1/orders")
public class OrderController {
    @Autowired
    OrderService orderService;

    @Autowired
    OrderRepository orderRepository;
    @Autowired
    EmailService emailService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    TicketRepsitory ticketRepsitory;
    @Autowired
    SeatSettingRepository seatSettingRepository;
@Autowired
    ShowtimeRepository showtimeRepository;
    @GetMapping
    public PageResponse getAllOrder(
            @RequestParam (defaultValue = "1") long page
    ) {
        long start = System.currentTimeMillis();
        List<OrderResponseDto> orderResponseDtos = orderService.getAllOrders();
        long totalOrders = orderResponseDtos.stream().count();
        // Tạo đối tượng PageDataResponse
        long totalPages = totalOrders / 10;
        if (totalOrders % 10 != 0) {
            totalPages += 1;
        }
        PageDataResponse pageDataResponse = new PageDataResponse((long) 0, (long) 10, page, orderResponseDtos.stream()
                .skip((page - 1) * 10)
                .limit(10)
                .collect(Collectors.toList()));
        pageDataResponse.setTotalPage(totalPages);
        return new PageResponse(200, pageDataResponse, start);
    }

    @PostMapping
    public Response createOrder(@RequestBody OrderRequestCreateDto orderRequestCreateDto) {
        long start = System.currentTimeMillis();
        OrderResponseDto orderResponseDto = orderService.createOrder(orderRequestCreateDto, "PAID");
        return new Response(orderResponseDto, start);
    }

    @DeleteMapping ("/{id}")
    public Response deleteOrder(@PathVariable long id) {
        long start = System.currentTimeMillis();
        try {
            orderService.deleteOrder(id);
            return new Response(200, "Order deleted successfully.", System.currentTimeMillis() - start);
        } catch (RuntimeException e) {
            return new Response(400, "Order not found or couldn't be deleted: " + e.getMessage(), System.currentTimeMillis() - start);
        }
    }

    @GetMapping ("/{id}")
    public Response getOrderById(@PathVariable long id) {
        long start = System.currentTimeMillis();
        try {
            OrderResponseDto orderResponseDto = orderService.getOrderById(id);
            return new Response(orderResponseDto, start);
        } catch (RuntimeException e) {
            return new Response(400, "Order not found : " + e.getMessage(), System.currentTimeMillis() - start);

        }
    }

    @GetMapping ("/get-by-user/{id}")
    public PageResponse getOrdersByUser(@PathVariable long id, @RequestParam (defaultValue = "1") long page) {
        long start = System.currentTimeMillis();

        List<OrderResponseDto> orderResponseDtos = orderService.getOrderByUser(id);
        long totalOrders = orderResponseDtos.stream().count();
        long totalPage = totalOrders / 10;
        if (totalOrders % 10 != 0) totalPage += 1;
        // Tạo đối tượng PageDataResponse
        PageDataResponse pageDataResponse = new PageDataResponse((long) 0, (long) 10, page, orderResponseDtos.stream()
                .skip((page - 1) * 10)
                .limit(10)
                .collect(Collectors.toList()));
        pageDataResponse.setTotalPage(totalPage);
        return new PageResponse(200, pageDataResponse, System.currentTimeMillis() - start);
    }

    @PostMapping ("/VNPay")
    public Response getPay(@RequestBody OrderRequestCreateDto orderRequestCreateDto) throws UnsupportedEncodingException {
        OrderResponseDto orderResponseDto = orderService.createOrder(orderRequestCreateDto, "PAYING");
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String orderType = "other";
        long amount = (long) orderRequestCreateDto.getTotal() * 100;
        String bankCode = "NCB";

        String vnp_TxnRef = VNPayConfig.getRandomNumber(8);
        String vnp_IpAddr = "127.0.0.1";

        String vnp_TmnCode = VNPayConfig.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");

        vnp_Params.put("vnp_BankCode", bankCode);
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);

        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", VNPayConfig.vnp_ReturnUrl + "?orderId=" + orderResponseDto.getId());
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = VNPayConfig.hmacSHA512(VNPayConfig.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = VNPayConfig.vnp_PayUrl + "?" + queryUrl;
        long start = System.currentTimeMillis();
        PaymentOrderDtoResponse paymentOrderDtoResponse = new PaymentOrderDtoResponse()
                .builder()
                .id(orderResponseDto.getId())
                .seats(orderResponseDto.getSeats())
                .productOrderInfos(orderResponseDto.getProductOrderInfos())
                .state(orderResponseDto.getState())
                .tickets(orderResponseDto.getTickets())
                .total(orderResponseDto.getTotal())
                .user(orderResponseDto.getUser())
                .createdAt(orderResponseDto.getCreatedAt())
                .PaymentUrl(paymentUrl)
                .paymentType(orderResponseDto.getPaymentType())
                .build();
        return new Response(paymentOrderDtoResponse, start);
    }

    @GetMapping ("/payment-callback")
    public Response paymentCallback(@RequestParam Map<String, String> queryParams, HttpServletResponse response) throws IOException, IOException, NotFoundException {
        String vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
        long start = System.currentTimeMillis();
        String orderId = queryParams.get("orderId");
        if (orderId != null && !orderId.equals("")) {
            Order order = orderRepository.findById(Long.parseLong(queryParams.get("orderId"))).get();

            if ("00".equals(vnp_ResponseCode)) {
                // Giao dịch thành công
                // Thực hiện các xử lý cần thiết, ví dụ: cập nhật CSDL

                order.setState("PAID");
                orderRepository.save(order);
                UserEntity userEntity = userRepository.findById(order.getUserId()).get();
                Ticket ticket = ticketRepsitory.findOneByOrderId(order.getId());
                SeatSetting setting = seatSettingRepository.findById(ticket.getSeatSettingId()).get();
                Showtime showtime = showtimeRepository.findById((int)setting.getShowtimeId()).get();
                String showtimeDate = showtime.getStartTime() + " ngày " + showtime.getShowDate();
                EmailDetails emailDetails = new EmailDetails();
                emailDetails.setSubject("NEDCINE - Xác Nhận Đặt Vé");
                emailDetails.setRecipient(userEntity.getEmail());

                emailService.sendBookingTickectEmail(emailDetails,showtime.getMovie().getTitle() , userEntity.getUsername(),showtimeDate , "http://localhost:3000/default/user-orders/view/" + orderId);
                response.sendRedirect("http://localhost:3000/default");
                return new Response(200, "Paid Vnpay success", start);


            } else {
                orderService.deleteOrder(Long.parseLong(queryParams.get("orderId")));
                response.sendRedirect("http://localhost:3000/default");
                return new Response(400, "Cancel bill", start);
            }
        }

        return new Response(400, "Pay failed", start);

    }
}
