package com.nthao.nedcine.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Data
@Setter
@Table(name = "SeatSettings")
public class SeatSetting {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private int id;
    @ManyToOne
    @JoinColumn(name = "seat")
    private Seat seat;
    @ManyToOne
    @JoinColumn(name = "showtime")
    private Showtime showtime;
    @Column(columnDefinition = "varchar(255)")
    private String status;
}
