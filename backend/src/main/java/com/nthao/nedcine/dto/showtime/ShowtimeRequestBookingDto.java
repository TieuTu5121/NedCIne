package com.nthao.nedcine.dto.showtime;

import lombok.*;



@Setter
@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShowtimeRequestBookingDto {
    private int movieId;
    private String city;
    private String date;

}
