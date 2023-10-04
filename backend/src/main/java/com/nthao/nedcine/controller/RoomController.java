package com.nthao.nedcine.controller;

import com.nthao.nedcine.dto.room.RoomRequestDto;
import com.nthao.nedcine.dto.room.RoomResponseDto;
import com.nthao.nedcine.entity.Cinema;
import com.nthao.nedcine.service.CinemaService;
import com.nthao.nedcine.service.RoomService;
import com.nthao.nedcine.util.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/api/v1/rooms")
public class RoomController {
    @Autowired
    RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping
    public Response getAllRooms() {
        long start = System.currentTimeMillis();
        List<RoomResponseDto> rooms = roomService.getAllRooms();
        return new Response(rooms, start);
    }

    @GetMapping ("/by-cinema/{cinemaId}")
    public Response getRoomsByCinema(@PathVariable Integer cinemaId) {
        long start = System.currentTimeMillis();

        List<RoomResponseDto> roomResponseDtos = roomService.getRoomsByCinema(cinemaId);
        return new Response(roomResponseDtos, start);
    }

    @GetMapping ("/{id}")
    public Response getRoomById(@PathVariable Integer id) {
        long start = System.currentTimeMillis();
        RoomResponseDto room = roomService.getRoomById(id);
        if (room == null) {
            return new Response(404, "Room not found", start);
        }

        return new Response(room, start);
    }

    @PostMapping
    public Response createRoom(@RequestBody RoomRequestDto room) {
        long start = System.currentTimeMillis();
        RoomResponseDto createdRoom = roomService.createRoom(room);
        long took = System.currentTimeMillis() - start;
        return new Response(createdRoom, took);
    }

    @PutMapping ("/{id}")
    public Response updateRoom(@PathVariable Integer id, @RequestBody RoomRequestDto room) {
        long start = System.currentTimeMillis();
        roomService.updateRoom(id, room);
        long took = System.currentTimeMillis() - start;
        return new Response(200, "Room updated successfully", took);
    }

    @DeleteMapping ("/{id}")
    public Response deleteRoom(@PathVariable Integer id) {
        long start = System.currentTimeMillis();
        roomService.deleteRoom(id);
        long took = System.currentTimeMillis() - start;
        return new Response(200, "Room deleted successfully", took);
    }

}
