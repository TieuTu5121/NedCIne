package com.nedCinema.backend.service;

import com.nedCinema.backend.entity.Movies;

import java.util.List;

public interface MoviesService {
    Movies addMovie(Movies movie);
    void deleteMovie(int id);
    List<Movies> getAllMovies();
    Movies getMovieByName(String title);
    Movies updateMovie(int id, Movies movie);
}
