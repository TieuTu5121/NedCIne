package com.nthao.nedcine.dto.showtime;

import com.nthao.nedcine.dto.room.RoomRequestDto;
import com.nthao.nedcine.entity.Movie;
import com.nthao.nedcine.entity.Room;
import lombok.*;

import java.sql.Time;
import java.util.Date;
import java.util.PrimitiveIterator;

@Builder
@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ShowtimeResponseDto {
    private int id;
    private Movie movie;
    private Room room;
    private String showdate;
    private String finishTime;
    private String showtime;
    private String state;
    private Float price;
}
