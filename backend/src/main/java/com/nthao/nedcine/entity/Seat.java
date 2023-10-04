package com.nthao.nedcine.entity;

import lombok.*;

import javax.persistence.*;
@Entity
@Data
@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Seats")
public class Seat {

    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private int id;
    @Column (columnDefinition = "varchar(255)")
    private char row;

    @Column (columnDefinition = "int")
    private int seatNumber;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "Room")
    private Room room;
}
