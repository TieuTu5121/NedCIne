package com.nthao.nedcine.controller;

import com.nthao.nedcine.dto.order.OrderRequestCreateDto;
import com.nthao.nedcine.dto.order.OrderResponseDto;
import com.nthao.nedcine.dto.showtime.ShowtimeResponseDto;
import com.nthao.nedcine.service.OrderService;
import com.nthao.nedcine.util.PageDataResponse;
import com.nthao.nedcine.util.PageResponse;
import com.nthao.nedcine.util.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping ("/api/v1/orders")
public class OrderController {
    @Autowired
    OrderService orderService;

    @GetMapping
    public PageResponse getAllOrder(
            @RequestParam (defaultValue = "1") long page
    ) {
        long start = System.currentTimeMillis();
        List<OrderResponseDto> orderResponseDtos = orderService.getAllOrders();
        long totalOrders = orderResponseDtos.stream().count();
        // Tạo đối tượng PageDataResponse
        PageDataResponse pageDataResponse = new PageDataResponse((long) 0, (long) 10, page, orderResponseDtos.stream()
                .skip((page - 1) * 10)
                .limit(10)
                .collect(Collectors.toList()));
        pageDataResponse.setTotalPage((totalOrders / 10) );
        return new PageResponse(200, pageDataResponse,  start);
    }

    @PostMapping
    public Response createOrder(@RequestBody OrderRequestCreateDto orderRequestCreateDto){
        long start = System.currentTimeMillis();
        OrderResponseDto orderResponseDto = orderService.createOrder(orderRequestCreateDto);
        return new Response(orderResponseDto, start);
    }
    @DeleteMapping("/{id}")
    public Response deleteOrder(@PathVariable long id) {
        long start = System.currentTimeMillis();
        try {
            orderService.deleteOrder(id);
            return new Response(200, "Order deleted successfully.", System.currentTimeMillis() - start);
        } catch (RuntimeException e) {
            return new Response(400, "Order not found or couldn't be deleted: " + e.getMessage(), System.currentTimeMillis() - start);
        }
    }
    @GetMapping("/{id}")
    public Response getOrderById(@PathVariable long id){
        long start = System.currentTimeMillis();
        try{
            OrderResponseDto orderResponseDto= orderService.getOrderById(id);
            return new Response(orderResponseDto,start);
        }
        catch (RuntimeException e){
            return new Response(400, "Order not found : " + e.getMessage(), System.currentTimeMillis() - start);

        }
    }
    @GetMapping("/get-by-user/{id}")
    public  PageResponse getOrdersByUser(@PathVariable long id,@RequestParam (defaultValue = "1") long page){
        long start = System.currentTimeMillis();

        List<OrderResponseDto> orderResponseDtos = orderService.getOrderByUser(id);
        long totalOrders = orderResponseDtos.stream().count();
        long totalPage = totalOrders /10;
        if(totalOrders % 10 != 0 ) totalPage+=1;
        // Tạo đối tượng PageDataResponse
        PageDataResponse pageDataResponse = new PageDataResponse((long) 0, (long) 10, page, orderResponseDtos.stream()
                .skip((page - 1) * 10)
                .limit(10)
                .collect(Collectors.toList()));
        pageDataResponse.setTotalPage(totalPage);
        return new PageResponse(200, pageDataResponse, System.currentTimeMillis() - start);
    }
}
