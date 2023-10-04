package com.nthao.nedcine.dto.room;

import com.nthao.nedcine.entity.Cinema;
import com.nthao.nedcine.entity.Seat;
import lombok.*;

import java.util.List;


@Data
@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RoomResponseDto {
    private int id;
    private String roomName;
    private long seatQuantity;
    private Cinema cinema;
    private List<Seat> seats;

}
