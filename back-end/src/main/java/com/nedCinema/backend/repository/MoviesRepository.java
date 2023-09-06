package com.nedCinema.backend.repository;

import com.nedCinema.backend.entity.Movies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MoviesRepository extends JpaRepository<Movies, Integer> {
    Movies findByTitle(String title);
}
