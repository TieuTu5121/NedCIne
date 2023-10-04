package com.nthao.nedcine.service;

import com.nthao.nedcine.entity.Seat;

import java.util.List;

public interface SeatService {

    List<Seat> getAllSeats();

    Seat getSeatById(int id);

    Seat createSeat(Seat seat);

    Seat updateSeat(int id, Seat seat);

    void deleteSeat(int id);
}
