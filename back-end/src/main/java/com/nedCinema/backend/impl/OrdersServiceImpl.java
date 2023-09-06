package com.nedCinema.backend.impl;

import com.nedCinema.backend.entity.Orders;
import com.nedCinema.backend.entity.Users;
import com.nedCinema.backend.exception.NotFoundException;
import com.nedCinema.backend.repository.OrdersRepository;
import com.nedCinema.backend.repository.UsersRepository;
import com.nedCinema.backend.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrdersServiceImpl implements OrdersService {
    @Autowired
    private  OrdersRepository ordersRepository;


    @Autowired
    private UsersRepository usersRepository;

    @Override
    public Orders addOrder(Orders order) {
        Users user = usersRepository.findById(order.getUser().getId())
                .orElseThrow(NotFoundException::new);
        order.setUser(user);

        return ordersRepository.save(order);
    }

    @Override
    public void deleteOrder(int id) {
        ordersRepository.deleteById(id);
    }

    @Override
    public List<Orders> getAllOrders() {
        return ordersRepository.findAll();
    }

    @Override
    public Orders updateOrder(int id, Orders updatedOrder) {
        Orders existingOrder = ordersRepository.findById(id)
                .orElseThrow(NotFoundException::new);

        existingOrder.setDiscount(updatedOrder.getDiscount());
        existingOrder.setTotal(updatedOrder.getTotal());
        existingOrder.setPhone(updatedOrder.getPhone());

        return ordersRepository.save(existingOrder);
    }
}
