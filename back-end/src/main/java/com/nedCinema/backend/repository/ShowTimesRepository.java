package com.nedCinema.backend.repository;

import com.nedCinema.backend.entity.ShowTimes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Time;
import java.util.List;

@Repository
public interface ShowTimesRepository extends JpaRepository<ShowTimes, Integer> {

    List<ShowTimes> findByStartTime(Time startTime);
}
