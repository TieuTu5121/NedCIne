package com.nthao.nedcine.dto.user;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserUpdateDto {
    private String username;
    private String email;
    private String sex;
    private String birthday;
    private String address;
    private String phone;
    private String role;
}
