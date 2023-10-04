package com.nthao.nedcine.entity;


import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table (name = "Rooms")
public class Room {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private int id;

    @Column (columnDefinition = "varchar(255)")
    private String roomName;

    @Column (columnDefinition = "int")
    private long seatQuantity;

    @ManyToOne (fetch = FetchType.EAGER)
    @JoinColumn (name = "cinema")
    private Cinema cinema;

}
