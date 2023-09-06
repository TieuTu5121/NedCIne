package com.nedCinema.backend.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.sql.Time;

@Entity
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Table(name = "ShowTimes")
public class ShowTimes {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Movie_ID")
    private Movies Movie;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ShowtimeSettings_ID")
    private ShowtimeSettings stSetting;

    @Column(columnDefinition = "time")
    private Time startTime;

    @Column(columnDefinition = "float not null")
    private Float price;

    public Movies getMovie() {
        return Movie;
    }

    public void setMovie(Movies movie) {
        Movie = movie;
    }

    public ShowtimeSettings getStSetting() {
        return stSetting;
    }

    public void setStSetting(ShowtimeSettings stSetting) {
        this.stSetting = stSetting;
    }

    public Time getStartTime() {
        return startTime;
    }

    public void setStartTime(Time startTime) {
        this.startTime = startTime;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }
}
