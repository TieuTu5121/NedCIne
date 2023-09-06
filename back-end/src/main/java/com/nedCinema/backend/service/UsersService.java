package com.nedCinema.backend.service;

import com.nedCinema.backend.entity.Users;

import java.util.List;

public interface UsersService {
    List<Users> getAllUsers();

    Users createUser(Users user);

    Users updateUser(int id, Users updatedUser);

    void deleteUser(int id);
}
