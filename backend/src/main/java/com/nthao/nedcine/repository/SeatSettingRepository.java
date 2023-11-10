package com.nthao.nedcine.repository;

import com.nthao.nedcine.entity.Seat;
import com.nthao.nedcine.entity.SeatSetting;
import com.nthao.nedcine.entity.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SeatSettingRepository extends JpaRepository<SeatSetting, Long> {
    @Query ("SELECT seat_settings FROM SeatSetting seat_settings WHERE seat_settings.seatId IN :seats")
    List<SeatSetting> findAllBySeat(List<Long> seats);

    @Query("select  seatStting from  SeatSetting seatStting where seatStting.id = :id")
    SeatSetting getById(Long id);
@Query("select st from SeatSetting st where st.showtimeId = :showtimeId order by st.id")
    List<SeatSetting> findByShowtimeId(long showtimeId);
}
