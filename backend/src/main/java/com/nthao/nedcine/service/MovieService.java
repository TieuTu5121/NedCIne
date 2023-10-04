package com.nthao.nedcine.service;

import com.nthao.nedcine.dto.movie.MovieRequestDto;
import com.nthao.nedcine.dto.movie.MovieResponseDto;
import com.nthao.nedcine.entity.Movie;
import org.springframework.stereotype.Service;

import java.util.List;
public interface MovieService {
    List<MovieResponseDto> getAllMovies();
    MovieResponseDto getMovieById(Integer id);
    MovieResponseDto createMovie(MovieRequestDto movieRequestDto);
    void updateMovie(Integer id, MovieRequestDto movieRequestDto);
    void deleteMovie(Integer id);
}
