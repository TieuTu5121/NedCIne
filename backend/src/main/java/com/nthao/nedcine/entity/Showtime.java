package com.nthao.nedcine.entity;

import lombok.*;

import javax.persistence.*;
import java.sql.Time;
import java.util.Date;

@Entity
@Data
@Setter@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table (name = "ShowTimes")
public class Showtime {

    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    @JoinColumn (name = "movie")
    private Movie Movie;
    @ManyToOne
    @JoinColumn (name = "room")
    private Room room;
    @Column (columnDefinition = "time")
    private String startTime;
    private String finishTime;
    private String showDate;
    private String state;
    @Column (columnDefinition = "float")
    private Float price;
}