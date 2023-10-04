package com.nthao.nedcine.dto.room;

import com.nthao.nedcine.entity.Cinema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RoomRequestDto {
    private int id;
    private String roomName;
    private long seatQuantity;
    private Cinema cinema;

}
