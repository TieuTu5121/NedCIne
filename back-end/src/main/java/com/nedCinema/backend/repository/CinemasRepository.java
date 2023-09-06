package com.nedCinema.backend.repository;

import com.nedCinema.backend.entity.Cinemas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CinemasRepository extends JpaRepository<Cinemas, Integer> {
    Cinemas findByName(String name);
}
