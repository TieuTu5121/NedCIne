package com.nthao.nedcine.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table (name = "ProductOrderInfos")
public class ProductOrderInfo {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private long id;
    private long productId;
    private long orderId;
    private int quantity;
    private float total;

}
