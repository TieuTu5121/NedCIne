    package com.nthao.nedcine.dto.order;

    import com.nthao.nedcine.entity.*;
    import lombok.*;
    import org.apache.catalina.User;

    import java.util.List;

    @Builder
    @Data
    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public class OrderResponseDto {
        private long id;
        private List<Ticket> tickets;
        private  List<ProductOrderInfo> productOrderInfos;
        private List<Seat> seats;
        private Showtime showtime;
        private String state;
        private float total;
        private UserEntity user;
        private float discount;
        private String createdAt;
    }
