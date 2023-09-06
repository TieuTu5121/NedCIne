package com.nedCinema.backend.impl;

import com.nedCinema.backend.entity.Roles;
import com.nedCinema.backend.entity.Users;
import com.nedCinema.backend.repository.RolesRepository;
import com.nedCinema.backend.repository.UsersRepository;
import com.nedCinema.backend.service.UsersService;
import com.nedCinema.backend.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.management.relation.Role;
import java.util.List;

@Service
public class UsersServiceImpl implements UsersService {

    private final UsersRepository usersRepository;

    @Autowired
    public UsersServiceImpl(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @Autowired
    private RolesRepository rolesRepository;
    @Override
    public Users createUser(Users user) {
        Roles role = rolesRepository.findById(user.getRole().getId())
                .orElseThrow(NotFoundException::new);

        user.setRole(role);
        return usersRepository.save(user);
    }

    @Override
    public void deleteUser(int id) {
        usersRepository.deleteById(id);
    }

    @Override
    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    @Override
    public Users updateUser(int id, Users updatedUser) {
        Users existingUser = usersRepository.findById(id)
                .orElseThrow(NotFoundException::new);

        existingUser.setPassword(updatedUser.getPassword());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPhone(updatedUser.getPhone());
        existingUser.setDisplayName(updatedUser.getDisplayName());
        existingUser.setRole(updatedUser.getRole());
        existingUser.setCreatedAt(updatedUser.getCreatedAt());

        return usersRepository.save(existingUser);
    }
}
