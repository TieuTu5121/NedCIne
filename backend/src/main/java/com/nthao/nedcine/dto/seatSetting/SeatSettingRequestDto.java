package com.nthao.nedcine.dto.seatSetting;

import com.nthao.nedcine.entity.Seat;
import com.nthao.nedcine.entity.Showtime;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
public class SeatSettingRequestDto {
    private Seat seat;
    private Showtime showtime;
    private String status;
}
