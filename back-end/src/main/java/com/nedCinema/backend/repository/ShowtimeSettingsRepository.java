package com.nedCinema.backend.repository;

import com.nedCinema.backend.entity.ShowtimeSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ShowtimeSettingsRepository extends JpaRepository<ShowtimeSettings, Integer> {
    List<ShowtimeSettings> findByShowDate(Date showDate);
}
