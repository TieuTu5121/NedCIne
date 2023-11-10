package com.nthao.nedcine.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table (name = "Tickets")
public class Ticket {

    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private long id;
    private long seatSettingId;
    private long orderId;
    private float price;

}
