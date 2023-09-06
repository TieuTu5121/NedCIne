package com.nedCinema.backend.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.Year;

@Entity
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Table(name = "Movies")
public class Movies {
    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    private int id;
    @Column(columnDefinition = "varchar(255)")
    private String title;
    @Column(columnDefinition = "int")
    private Year year;
    @Column(columnDefinition = "varchar(255)")
    private String rated;
    @Column(columnDefinition = "varchar(255)")
    private String runTime;
    @Column(columnDefinition = "varchar(255)")
    private String genres;
    @Column(columnDefinition = "varchar(255)")
    private String directors;
    @Column(columnDefinition = "varchar(255)")
    private String actors;
    @Column(columnDefinition = "varchar(255)")
    private String plot;
    @Column(columnDefinition = "varchar(255)")
    private String language;
    @Column(columnDefinition = "varchar(255)")
    private String poster;
    @Column(columnDefinition = "varchar(255)")
    private String trailer;
    @Column(columnDefinition = "varchar(255)")
    private String banner;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Year getYear() {
        return year;
    }

    public void setYear(Year year) {
        this.year = year;
    }

    public String getRated() {
        return rated;
    }

    public void setRated(String rated) {
        this.rated = rated;
    }

    public String getRunTime() {
        return runTime;
    }

    public void setRunTime(String runTime) {
        this.runTime = runTime;
    }

    public String getGenres() {
        return genres;
    }

    public void setGenres(String genres) {
        this.genres = genres;
    }

    public String getDirectors() {
        return directors;
    }

    public void setDirectors(String directors) {
        this.directors = directors;
    }

    public String getActors() {
        return actors;
    }

    public void setActors(String actors) {
        this.actors = actors;
    }

    public String getPlot() {
        return plot;
    }

    public void setPlot(String plot) {
        this.plot = plot;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    public String getTrailer() {
        return trailer;
    }

    public void setTrailer(String trailer) {
        this.trailer = trailer;
    }

    public String getBanner() {
        return banner;
    }

    public void setBanner(String banner) {
        this.banner = banner;
    }
}
