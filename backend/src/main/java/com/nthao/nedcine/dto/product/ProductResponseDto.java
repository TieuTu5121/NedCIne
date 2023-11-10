package com.nthao.nedcine.dto.product;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ProductResponseDto {
    private long id;
    private String name;
    private String category;
    private String photo;
    private Float price;
    private int quantity;
}