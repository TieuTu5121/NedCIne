package com.nthao.nedcine.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table (name = "Products")

public class Product {

    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private long id;

    @Column (columnDefinition = "varchar(255)")
    private String name;

    @Column (columnDefinition = "varchar(255)")
    private String category;


    @Column (columnDefinition = "varchar(255)")
    private String photo;

    @Column (columnDefinition = "Float")
    private Float price;

    @Column (columnDefinition = "int")
    private int quantity;

    // Getter và Setter
}
