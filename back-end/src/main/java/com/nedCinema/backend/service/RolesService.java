package com.nedCinema.backend.service;

import com.nedCinema.backend.entity.Roles;

import java.util.List;

public interface RolesService {
    Roles addRole(Roles role);
    Roles updateRole(int id, Roles updatedRole);
    void deleteRole(int id);
    Roles getByRoleName(String roleName);
    List<Roles> getAllRoles();
}
