package com.nedCinema.backend.controller;

import com.nedCinema.backend.entity.Seats;
import com.nedCinema.backend.service.SeatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/seats")
public class SeatsController {

    private final SeatsService seatService;

    @Autowired
    public SeatsController(SeatsService seatService) {
        this.seatService = seatService;
    }

    @PostMapping
    public ResponseEntity<Seats> addSeat(@RequestBody Seats seat) {
        Seats addedSeat = seatService.addSeat(seat);
        return ResponseEntity.ok(addedSeat);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSeat(@PathVariable int id) {
        seatService.deleteSeat(id);
        return ResponseEntity.ok("Deleted seat with ID: " + id);
    }

    @GetMapping
    public ResponseEntity<Iterable<Seats>> getAllSeats() {
        Iterable<Seats> seats = seatService.getAllSeats();
        return ResponseEntity.ok(seats);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Seats> updateSeat(@PathVariable int id, @RequestBody Seats seat) {
        Seats updatedSeat = seatService.updateSeat(id, seat);
        return ResponseEntity.ok(updatedSeat);
    }
}
