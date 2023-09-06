package com.nedCinema.backend.service;

import com.nedCinema.backend.entity.Orders;

import java.util.List;

public interface OrdersService {
    Orders addOrder(Orders order);

    void deleteOrder(int id);

    List<Orders> getAllOrders();

    Orders updateOrder(int id, Orders updatedOrder);
}
