package com.nedCinema.backend.repository;

import com.nedCinema.backend.entity.Seats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface SeatsRepository extends JpaRepository<Seats, Integer> {
}
