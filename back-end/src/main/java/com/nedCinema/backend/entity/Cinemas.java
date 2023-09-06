package com.nedCinema.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Table(name = "Cinemas")
public class Cinemas {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "name"
            , nullable = false
            , columnDefinition = "varchar(255)")
    private String name;

    @Column(name = "address", nullable = false, columnDefinition = "varchar(255)")
    private String address;

//    @OneToMany(mappedBy = "cinema_ID", cascade = CascadeType.ALL, orphanRemoval = true)
//    @EqualsAndHashCode.Exclude
//    @ToString.Exclude
//    private List<Rooms> rooms;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

//    public List<Rooms> getRooms() {
//        return rooms;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
//    }
//
//    public void setRooms(List<Rooms> rooms) {
//        this.rooms = rooms;
//    }
}
