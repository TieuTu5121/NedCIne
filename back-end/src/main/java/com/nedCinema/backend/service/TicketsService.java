package com.nedCinema.backend.service;

import com.nedCinema.backend.entity.Tickets;

import java.util.List;

public interface TicketsService {
    Tickets addTicket(Tickets ticket);

    void deleteTicket(int id);

    List<Tickets> getAllTickets();

    Tickets updateTicket(int id, Tickets updatedTicket);
}
