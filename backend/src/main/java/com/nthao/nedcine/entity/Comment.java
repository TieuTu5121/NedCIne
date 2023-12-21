package com.nthao.nedcine.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "Comments", uniqueConstraints = {@UniqueConstraint(columnNames = {"userId", "movieId"})})
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;


    private long userId;


    private int movieId;

    private int rating;
    private String description;
    private String createdAt;
}
