package com.nthao.nedcine.controller;

import com.nthao.nedcine.dto.user.UserResponseDto;
import com.nthao.nedcine.dto.user.UserUpdateDto;
import com.nthao.nedcine.service.UserService;
import com.nthao.nedcine.util.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@RestController
@RequestMapping ("/api/v1/users")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping
    public Response getAllUsers(){
        long start = System.currentTimeMillis();
        try {
            List<UserResponseDto> userResponseDtoList = userService.getAllUsers();
            return  new Response(userResponseDtoList,start);
        }catch (RuntimeException exception){
            return new Response(400,"get all user failed with: " + exception.getMessage(),start );
        }
    }
    @PutMapping ("/{id}")
    public Response updateUserById(@PathVariable long id, @RequestBody UserUpdateDto userUpdateDto) {
        long start = System.currentTimeMillis();
        try {
            userService.updateUserById(id, userUpdateDto);
            return new Response(200,"User updated successfully", start);
        } catch (EntityNotFoundException e) {
            return new Response(404, "User not found with id: " + id, start);
        } catch (IllegalArgumentException e) {
            return new Response(400, "Invalid role: " + userUpdateDto.getRole(), start);
        } catch (RuntimeException exception) {
            return new Response(500, "Update user failed with: " + exception.getMessage(), start);
        }
    }
    @PutMapping("/update-role/{id}")
    public Response updateRoleById(@PathVariable long id,@RequestBody String role){
        long start = System.currentTimeMillis();
        userService.updateRoleById(id,role);
        return  new Response(200,"Updated role success",start);
    }

}
