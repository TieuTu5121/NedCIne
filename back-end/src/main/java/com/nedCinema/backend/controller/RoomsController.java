package com.nedCinema.backend.controller;

import com.nedCinema.backend.entity.Rooms;
import com.nedCinema.backend.exception.NotFoundException;
import com.nedCinema.backend.service.RoomsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomsController {
    @Autowired
    private RoomsService roomService;

    @PostMapping
    public ResponseEntity<String> addRoom(@RequestBody Rooms room) {
        roomService.addRoom(room);
        return ResponseEntity.status(HttpStatus.CREATED).body("Room added successfully.");
    }

    @GetMapping("/byname/{roomName}")
    public ResponseEntity<Rooms> getRoomByName(@PathVariable String roomName) {
        Rooms room = roomService.getRoomByName(roomName);
        return ResponseEntity.ok(room);
    }

    @GetMapping
    public ResponseEntity<List<Rooms>> getRooms() {
        List<Rooms> rooms = roomService.getRooms();
        return ResponseEntity.ok(rooms);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRoom(@PathVariable int id) {
        roomService.deleteRoom(id);
        return ResponseEntity.ok("Room deleted successfully.");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateRoom(@PathVariable int id, @RequestBody Rooms room) {
        try {
            Rooms updatedRoom = roomService.updateRoom(id, room);
            return ResponseEntity.ok("Room updated successfully.");
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Room not found.");
        }
    }
}
