package com.nthao.nedcine.dto.showtime;

import com.nthao.nedcine.entity.Movie;
import com.nthao.nedcine.entity.Room;
import lombok.*;

import java.lang.management.ThreadInfo;
import java.sql.Time;
import java.util.Date;

@Setter@Getter@Data
@AllArgsConstructor@NoArgsConstructor
public class ShowtimeRequestDto {
    private Movie movie;
    private Room room;
    private Time showtime;
    private Date showdate;
    private float price;
    private String state;


}
