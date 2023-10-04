package com.nthao.nedcine.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table (name = "Cinemas")
public class Cinema {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "name", columnDefinition = "varchar(255)")
    private String name;
    @Column(name = "city")
    private String city;
    @Column(name = "address", columnDefinition = "varchar(255)")
    private String address;
}
