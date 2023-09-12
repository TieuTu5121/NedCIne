package com.nedCinema.backend.impl;

import com.nedCinema.backend.entity.Cinemas;
import com.nedCinema.backend.entity.Rooms;
import com.nedCinema.backend.exception.NotFoundException;
import com.nedCinema.backend.repository.CinemasRepository;
import com.nedCinema.backend.repository.RoomsRepository;
import com.nedCinema.backend.service.RoomsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomsServiceImpl implements RoomsService {
    @Autowired
    private RoomsRepository roomRepository;
    @Autowired
    private CinemasRepository cinemasRepository;

    @Override
    public void addRoom(Rooms room) {
        Cinemas cinema = cinemasRepository.findById(room.getCinemaID().getId()).orElse(null);

        if (cinema != null) {
            room.setCinemaID(cinema);
            roomRepository.save(room);
        } else {
            throw new NotFoundException();
        }
    }

    @Override
    public Rooms getRoomByName(String roomName) {
        return roomRepository.findByRoomName(roomName);
    }

    @Override
    public List<Rooms> getRooms() {
        return roomRepository.findAll();
    }

    @Override
    public void deleteRoom(int id) {
        roomRepository.deleteById(id);
    }

    @Override
    public Rooms updateRoom(int id, Rooms room) {
        Optional<Rooms> optionalRoom = roomRepository.findById(id);
        if (optionalRoom.isPresent()) {
            Rooms existingRoom = optionalRoom.get();
            existingRoom.setRoomName(room.getRoomName());
            existingRoom.setSeatQuantity(room.getSeatQuantity());
            existingRoom.setCinemaID(room.getCinemaID());
            return roomRepository.save(existingRoom);
        } else {
            throw new NotFoundException();
        }
    }
}
