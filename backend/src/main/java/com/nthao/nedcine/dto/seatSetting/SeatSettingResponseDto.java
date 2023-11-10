package com.nthao.nedcine.dto.seatSetting;

import com.nthao.nedcine.contants.Status;
import com.nthao.nedcine.entity.Seat;
import com.nthao.nedcine.entity.Showtime;
import lombok.*;

@Builder
@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SeatSettingResponseDto {
    private long id;
    private Seat seat;
    private Showtime showtime;
    private String status;


}
