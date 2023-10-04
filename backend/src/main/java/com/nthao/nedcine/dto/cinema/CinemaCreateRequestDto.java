package com.nthao.nedcine.dto.cinema;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class CinemaCreateRequestDto {
    private String name ;
    private String city;
    private String address;
}
