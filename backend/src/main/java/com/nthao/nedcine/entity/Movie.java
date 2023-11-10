package com.nthao.nedcine.entity;

import com.nthao.nedcine.contants.Status;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table (name = "Movies")
public class Movie {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private int id;

    private String title;
    @Column (columnDefinition = "int")
    private int year;

    private String rated;

    private String runTime;

    private String genres;

    private Status status;

    private String directors;

    private String actors;

    @Column (columnDefinition = "TEXT")
    private String plot;

    private String language;

    private String poster;

    private String trailer;

    private String release;

    private String banner;
}
