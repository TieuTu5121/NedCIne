package com.nthao.nedcine.service;

import com.nthao.nedcine.dto.room.RoomResponseDto;
import com.nthao.nedcine.dto.room.RoomRequestDto;
import com.nthao.nedcine.entity.Cinema;

import java.util.List;

public interface RoomService {

    List<RoomResponseDto> getAllRooms();

    RoomResponseDto getRoomById(int id);

    RoomResponseDto createRoom(RoomRequestDto roomRequestDto);

    List<RoomResponseDto> getRoomsByCinema(int cinemaId);

    RoomResponseDto updateRoom(int id, RoomRequestDto room);

    void deleteRoom(int id);

}
