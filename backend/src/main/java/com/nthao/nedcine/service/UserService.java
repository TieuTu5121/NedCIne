package com.nthao.nedcine.service;

import com.nthao.nedcine.dto.user.UserRegisterDto;
import com.nthao.nedcine.dto.user.UserLoginDto;
import com.nthao.nedcine.dto.user.UserResponseDto;
import com.nthao.nedcine.entity.UserEntity;

import java.util.Map;

public interface UserService {

    UserResponseDto userMapper(UserEntity user);
    UserResponseDto register(UserRegisterDto userCreateDto);
    Map<String, Object> login(UserLoginDto userLoginDto);
    UserResponseDto profile();
}
