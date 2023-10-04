package com.nthao.nedcine.dto.movie;

import com.nthao.nedcine.contants.Status;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;
import java.util.Set;

@Getter
@Setter
@Builder
@Data
public class MovieRequestDto {

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
