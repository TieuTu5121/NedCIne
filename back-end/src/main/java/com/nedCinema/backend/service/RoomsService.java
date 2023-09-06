package com.nedCinema.backend.service;

import com.nedCinema.backend.entity.Rooms;

import java.util.List;

public interface RoomsService {
    void addRoom(Rooms room);
    Rooms getRoomByName(String roomName);
    List<Rooms> getRooms();
    void deleteRoom(int id);
    Rooms updateRoom(int id, Rooms room);
}
