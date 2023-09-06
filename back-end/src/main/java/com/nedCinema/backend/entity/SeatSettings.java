package com.nedCinema.backend.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.sql.Struct;

@Entity
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Table(name = "SeatSettings")
public class SeatSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Seat_ID")
    private Seats seat;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Showtime_ID")
    private ShowTimes showTime;

    @Column(columnDefinition = "varchar(255)")
    private String status;

    public Seats getSeat() {
        return seat;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setSeat(Seats seat) {
        this.seat = seat;
    }

    public ShowTimes getShowTime() {
        return showTime;
    }

    public void setShowTime(ShowTimes showTime) {
        this.showTime = showTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
