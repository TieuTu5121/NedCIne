package com.nedCinema.backend.impl;

import com.nedCinema.backend.entity.Orders;
import com.nedCinema.backend.entity.Seats;
import com.nedCinema.backend.entity.ShowTimes;
import com.nedCinema.backend.entity.Tickets;
import com.nedCinema.backend.exception.NotFoundException;
import com.nedCinema.backend.repository.OrdersRepository;
import com.nedCinema.backend.repository.SeatsRepository;
import com.nedCinema.backend.repository.ShowTimesRepository;
import com.nedCinema.backend.repository.TicketsRepository;
import com.nedCinema.backend.service.TicketsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketsServiceImpl implements TicketsService {

    private final TicketsRepository ticketsRepository;

    @Autowired
    public TicketsServiceImpl(TicketsRepository ticketsRepository) {
        this.ticketsRepository = ticketsRepository;
    }

    @Autowired
    private SeatsRepository seatsRepository;
    @Autowired
    private OrdersRepository ordersRepository;
    @Autowired
    private ShowTimesRepository showTimesRepository;

    @Override
    public Tickets addTicket(Tickets ticket) {
        Seats seat = seatsRepository.findById(ticket.getSeat().getId())
                .orElseThrow(NotFoundException::new);
        Orders order = ordersRepository.findById(ticket.getOrders().getId())
                .orElseThrow(NotFoundException::new);
        ShowTimes showTime = showTimesRepository.findById(ticket.getShowTimes().getId())
                .orElseThrow(NotFoundException::new);
        ticket.setSeat(seat);
        ticket.setOrders(order);
        ticket.setShowTimes(showTime);
        return ticketsRepository.save(ticket);
    }

    @Override
    public void deleteTicket(int id) {
        ticketsRepository.deleteById(id);
    }

    @Override
    public List<Tickets> getAllTickets() {
        return ticketsRepository.findAll();
    }

    @Override
    public Tickets updateTicket(int id, Tickets updatedTicket) {
        Tickets existingTicket = ticketsRepository.findById(id)
                .orElseThrow(NotFoundException::new);

        existingTicket.setTotalPrice(updatedTicket.getTotalPrice());
        existingTicket.setShowTimes(updatedTicket.getShowTimes());
        existingTicket.setOrders(updatedTicket.getOrders());
        existingTicket.setSeat(updatedTicket.getSeat());

        return ticketsRepository.save(existingTicket);
    }
}
