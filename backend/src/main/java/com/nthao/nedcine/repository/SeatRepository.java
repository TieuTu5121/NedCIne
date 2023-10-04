package com.nthao.nedcine.repository;

import com.nthao.nedcine.entity.Seat;
import com.nthao.nedcine.entity.SeatSetting;
import com.nthao.nedcine.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Integer> {
    @Query("SELECT s FROM Seat s WHERE s.room.id = :roomId")
    public List<Seat> findSeatsByRoomId(int roomId);
}
