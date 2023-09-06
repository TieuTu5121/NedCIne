package com.nedCinema.backend.service;

import com.nedCinema.backend.entity.Seats;

import java.util.Date;
import java.util.List;

public interface SeatsService {
    Seats addSeat(Seats seat);
    void deleteSeat(int id);
    Iterable<Seats> getAllSeats();

    Seats updateSeat(int id, Seats updatedSeat);
}
