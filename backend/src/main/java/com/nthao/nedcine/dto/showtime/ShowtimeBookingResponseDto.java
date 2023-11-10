package com.nthao.nedcine.dto.showtime;

import com.nthao.nedcine.entity.Cinema;
import com.nthao.nedcine.entity.Showtime;
import lombok.*;

import java.util.List;

@Builder
@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ShowtimeBookingResponseDto {
    private List<Showtime> showtimes;
    private Cinema cinema;

}
