package com.nedCinema.backend.controller;

import com.nedCinema.backend.entity.Tickets;
import com.nedCinema.backend.service.TicketsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketsController {

    private final TicketsService ticketsService;

    @Autowired
    public TicketsController(TicketsService ticketsService) {
        this.ticketsService = ticketsService;
    }

    @PostMapping
    public ResponseEntity<Tickets> addTicket(@RequestBody Tickets ticket) {
        Tickets addedTicket = ticketsService.addTicket(ticket);
        return ResponseEntity.ok(addedTicket);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTicket(@PathVariable int id) {
        ticketsService.deleteTicket(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Tickets>> getAllTickets() {
        List<Tickets> tickets = ticketsService.getAllTickets();
        return ResponseEntity.ok(tickets);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tickets> updateTicket(@PathVariable int id, @RequestBody Tickets updatedTicket) {
        Tickets updated = ticketsService.updateTicket(id, updatedTicket);
        return ResponseEntity.ok(updated);
    }
}
