package com.nedCinema.backend.entity;

import com.nedCinema.backend.controller.RoomsController;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Table(name = "ShowtimeSettings")
public class ShowtimeSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Room_ID")
    private Rooms room;

    @Column(columnDefinition = "date")
    private Date showDate;

    public Rooms getRoom() {
        return room;
    }

    public void setRoom(Rooms room) {
        this.room = room;
    }

    public Date getShowDate() {
        return showDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setShowDate(Date showDate) {
        this.showDate = showDate;
    }
}
