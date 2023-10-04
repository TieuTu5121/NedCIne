package com.nthao.nedcine.repository;

import com.nthao.nedcine.entity.Cinema;
import com.nthao.nedcine.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Integer> {
    @Query("SELECT rooms FROM Room rooms WHERE rooms.cinema = :cinema")
    List<Room> findAllByCinema(@Param("cinema") Cinema cinema);

}
