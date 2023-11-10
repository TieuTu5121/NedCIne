package com.nthao.nedcine.dto.order;

import com.nthao.nedcine.entity.*;
import lombok.*;

import java.util.List;

@Builder
@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequestCreateDto {
    private List<SeatSetting> seatSettings;
    private List<ProductOrderInfo> productOrderInfos;
    private Showtime showtime;
    private long userId;
    private float total;

    private float discount;
    private String createdAt;

}
