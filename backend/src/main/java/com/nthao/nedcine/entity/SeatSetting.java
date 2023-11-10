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
    private long id;
    private long seatId;
    private long showtimeId;
    @Column(columnDefinition = "varchar(255)")
    private String status;
}
