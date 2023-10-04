package com.nthao.nedcine.dto.movie;

import lombok.*;

@Getter
@Setter
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieResponseDto {

    private Integer id;
    private String title;
    private int year;
    private String rated;
    private String runTime;
    private String genres;
    private String status;
    private String directors;
    private String actors;
    private String plot;
    private String language;
    private String release;
    private String poster;
    private String trailer;
    private String banner;
}