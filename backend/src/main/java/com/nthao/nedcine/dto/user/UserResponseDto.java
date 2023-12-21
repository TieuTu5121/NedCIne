package com.nthao.nedcine.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDto {
    private long id;
    private String username;
    private String email;
    private String sex;
    private String birthday;
    private String address;
    private String role;
private String phone;

}
