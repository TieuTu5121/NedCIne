package com.nthao.nedcine.service.impl;

import com.nthao.nedcine.entity.Seat;
import com.nthao.nedcine.repository.SeatRepository;
import com.nthao.nedcine.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeatServiceImpl implements SeatService {

    @Autowired
    SeatRepository seatRepository;

    @Override
    public List<Seat> getAllSeats() {
        return seatRepository.findAll();
    }

    @Override
    public Seat getSeatById(int id) {
        return seatRepository.findById(id).orElse(null);
    }

    @Override
    public Seat createSeat(Seat seat) {
        return seatRepository.save(seat);
    }

    @Override
    public Seat updateSeat(int id, Seat seat) {
        Seat existingSeat = seatRepository.findById(id).orElse(null);
        if(existingSeat != null){
            existingSeat.setRow(seat.getRow());
            existingSeat.setSeatNumber(seat.getSeatNumber());
            existingSeat.setRoom(seat.getRoom());
        }

        return seatRepository.save(existingSeat);
    }

    @Override
    public void deleteSeat(int id) {
        seatRepository.deleteById(id);
    }
}
