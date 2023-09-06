package com.nedCinema.backend.impl;

import com.nedCinema.backend.entity.Rooms;
import com.nedCinema.backend.entity.Seats;
import com.nedCinema.backend.exception.NotFoundException;
import com.nedCinema.backend.repository.RoomsRepository;
import com.nedCinema.backend.repository.SeatsRepository;
import com.nedCinema.backend.service.SeatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class SeatsServiceImpl implements SeatsService {

    private final SeatsRepository seatRepository;

    @Autowired
    public SeatsServiceImpl(SeatsRepository seatRepository) {
        this.seatRepository = seatRepository;
    }

    @Autowired
    private RoomsRepository roomsRepository;
    @Override
    public Seats addSeat(Seats seat) {

        Rooms room = roomsRepository.findById(seat.getRoom().getId())
                .orElseThrow(NotFoundException::new);

        seat.setRoom(room);
        return seatRepository.save(seat);
    }

    @Override
    public void deleteSeat(int id) {
        if (seatRepository.existsById(id)) {
            seatRepository.deleteById(id);
        } else {
            throw new NotFoundException();
        }
    }

    @Override
    public Iterable<Seats> getAllSeats() {
        return seatRepository.findAll();
    }


    @Override
    public Seats updateSeat(int id, Seats updatedSeat) {
        Optional<Seats> optionalExistingSeat = seatRepository.findById(id);

        if (optionalExistingSeat.isPresent()) {
            Seats existingSeat = optionalExistingSeat.get();
            existingSeat.setRow(updatedSeat.getRow());
            existingSeat.setSeatNumber(updatedSeat.getSeatNumber());
            existingSeat.setRoom(updatedSeat.getRoom());

            return seatRepository.save(existingSeat);
        } else {
            throw new NotFoundException();
        }
    }

}
