package com.nthao.nedcine.dto.cinema;

import lombok.*;

import javax.persistence.Entity;

@Setter
@Getter
@AllArgsConstructor
@Data
@Builder
public class CinemaResponseDto {
    private  int id;
    private String name;
    private String address;
    private String city;

}
