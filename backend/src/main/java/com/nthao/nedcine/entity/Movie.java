package com.nthao.nedcine.entity;

import lombok.*;

import javax.persistence.*;
import java.time.Year;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table (name = "Movies")
public class Movie {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private int id;
    @Column (columnDefinition = "varchar(255)")
    private String title;
    @Column (columnDefinition = "int")
    private Year year;
    @Column (columnDefinition = "varchar(255)")
    private String rated;
    @Column (columnDefinition = "varchar(255)")
    private String runTime;
    @Column (columnDefinition = "varchar(255)")
    private String genres;
    @Column (columnDefinition = "varchar(255)")
    private String directors;
    @Column (columnDefinition = "varchar(255)")
    private String actors;
    @Column (columnDefinition = "varchar(255)")
    private String plot;
    @Column (columnDefinition = "varchar(255)")
    private String language;
    @Column (columnDefinition = "varchar(255)")
    private String poster;
    @Column (columnDefinition = "varchar(255)")
    private String trailer;
    @Column (columnDefinition = "varchar(255)")
    private String banner;
    @Column (columnDefinition = "varchar(255)")
    private String status;
}