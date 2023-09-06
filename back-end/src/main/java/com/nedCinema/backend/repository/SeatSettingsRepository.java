package com.nedCinema.backend.repository;

import com.nedCinema.backend.entity.SeatSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeatSettingsRepository extends JpaRepository<SeatSettings, Integer> {

}
