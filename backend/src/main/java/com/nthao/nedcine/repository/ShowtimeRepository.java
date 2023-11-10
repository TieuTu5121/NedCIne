package com.nthao.nedcine.repository;

import com.nthao.nedcine.entity.Room;
import com.nthao.nedcine.entity.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ShowtimeRepository extends JpaRepository<Showtime, Integer> {
    @Query ("SELECT stime FROM Showtime stime WHERE stime.room = :room order by stime.showDate desc ")
    List<Showtime> getShowtimesByRoom(Room room);

    @Query ("select showtime from  Showtime showtime where showtime.room.cinema.city = :city and showtime.showDate = :date and showtime.Movie.id =:movie order by  showtime.startTime ")
    List<Showtime> getShowtimesByCityAndShowDate(String date, String city,int movie);
//    List<Showti me> findShowtimesByRoom(Room room);
}
