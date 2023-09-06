package com.nedCinema.backend.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Table(name = "Rooms")
public class Rooms {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(columnDefinition = "varchar(255)")
    private String roomName;

    @Column(columnDefinition = "int")
    private int seatQuantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cinema_ID")
    private Cinemas cinema_ID;

    public String getRoomName() {
        return roomName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public int getSeatQuantity() {
        return seatQuantity;
    }

    public void setSeatQuantity(int seatQuantity) {
        this.seatQuantity = seatQuantity;
    }

    public Cinemas getCinema_ID() {
        return cinema_ID;
    }

    public void setCinema_ID(Cinemas cinema_ID) {
        this.cinema_ID = cinema_ID;
    }
}
