package com.nedCinema.backend.repository;

import com.nedCinema.backend.entity.Rooms;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomsRepository extends JpaRepository<Rooms, Integer> {
    Rooms findByRoomName(String roomName);
}
