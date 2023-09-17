package com.nthao.nedcine.controller;

import com.nthao.nedcine.dto.user.UserLoginDto;
import com.nthao.nedcine.dto.user.UserRegisterDto;
import com.nthao.nedcine.dto.user.UserResponseDto;
import com.nthao.nedcine.service.impl.JwtServiceImpl;
import com.nthao.nedcine.service.impl.UserServiceImpl;
import com.nthao.nedcine.util.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    UserServiceImpl userService;

    @Autowired
    JwtServiceImpl jwtService;


    @PostMapping ("/register")
    public Response register(@RequestBody UserRegisterDto userCreateDto) {
        long start = System.currentTimeMillis();
        return new Response(userService.register(userCreateDto), start);
    }

    @PostMapping ("/login")
    public Response login(@RequestBody UserLoginDto userLoginDto) {
        long start = System.currentTimeMillis();
        try {
            Map<String, Object> success = userService.login(userLoginDto);
            return new Response(success, start);
        } catch (Exception e) {
            return new Response(400, e.getMessage(), start);
        }
    }

    @PostMapping ("/profile")
    public Response profile() {
        long start = System.currentTimeMillis();
        try {
            UserResponseDto user = userService.profile();
            return new Response(user, start);
        } catch (Exception e) {
            return new Response(400, e.getMessage(), start);
        }
    }
}