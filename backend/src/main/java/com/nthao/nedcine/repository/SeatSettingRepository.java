package com.nthao.nedcine.repository;

import com.nthao.nedcine.entity.Seat;
import com.nthao.nedcine.entity.SeatSetting;
import com.nthao.nedcine.entity.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SeatSettingRepository extends JpaRepository<SeatSetting, Integer> {
    @Query("SELECT seat_settings FROM SeatSetting seat_settings WHERE seat_settings.seat IN :seats")
    List<SeatSetting> findAllBySeat( List<Seat> seats);


    List<SeatSetting> findByShowtime(Showtime showtime);
}
