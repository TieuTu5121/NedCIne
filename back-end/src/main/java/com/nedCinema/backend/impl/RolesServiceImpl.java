package com.nedCinema.backend.impl;

import com.nedCinema.backend.entity.Roles;
import com.nedCinema.backend.repository.RolesRepository;
import com.nedCinema.backend.service.RolesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.nedCinema.backend.exception.NotFoundException;

import java.util.List;

@Service
public class RolesServiceImpl implements RolesService {

    @Autowired
    private RolesRepository rolesRepository;

    @Override
    public Roles addRole(Roles role) {
        return rolesRepository.save(role);
    }

    @Override
    public Roles updateRole(int id, Roles updatedRole) {
        Roles role = rolesRepository.findById(id)
                .orElseThrow(NotFoundException::new);

        role.setRoleName(updatedRole.getRoleName()); // Update other fields if needed

        return rolesRepository.save(role);
    }


    @Override
    public void deleteRole(int id) {
        rolesRepository.deleteById(id);
    }

    @Override
    public Roles getByRoleName(String roleName) {
        return rolesRepository.findByRoleName(roleName);
    }

    @Override
    public List<Roles> getAllRoles() {
        return rolesRepository.findAll();
    }
}
