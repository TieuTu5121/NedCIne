package com.nthao.nedcine.controller;

import com.nthao.nedcine.dto.movie.MovieRequestDto;
import com.nthao.nedcine.dto.movie.MovieResponseDto;
import com.nthao.nedcine.service.MovieService;
import com.nthao.nedcine.util.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/api/v1/movies")
public class MovieController {

    @Autowired
    MovieService movieService;

    @GetMapping
    public Response getAllMovies() {
        long start = System.currentTimeMillis();
        List<MovieResponseDto> movieResponseDtos = movieService.getAllMovies();
        return new Response(movieResponseDtos,start);
    }

    @GetMapping("/{id}")
    public Response getMovieById(@PathVariable Integer id) {
        long start = System.currentTimeMillis();
        MovieResponseDto movieResponseDto = movieService.getMovieById(id);
        if (movieResponseDto == null) {
            return new Response(404, "Movie not found", start);
        }
        long took = System.currentTimeMillis() - start;
        return new Response(movieResponseDto, took);
    }

    @PostMapping
    public Response createMovie(@RequestBody MovieRequestDto movieRequestDto) {
        long start = System.currentTimeMillis();
        MovieResponseDto movieResponseDto = movieService.createMovie(movieRequestDto);
        long took = System.currentTimeMillis() - start;
        return new Response(movieResponseDto, took);
    }

    @PutMapping("/{id}")
    public Response updateMovie(@PathVariable Integer id, @RequestBody MovieRequestDto movieRequestDto) {
        long start = System.currentTimeMillis();
        movieService.updateMovie(id, movieRequestDto);
        long took = System.currentTimeMillis() - start;
        return new Response(200, "Movie updated successfully", took);
    }

    @DeleteMapping("/{id}")
    public Response deleteMovie(@PathVariable Integer id) {
        long start = System.currentTimeMillis();
        movieService.deleteMovie(id);
        long took = System.currentTimeMillis() - start;
        return new Response(200, "Movie deleted successfully", took);
    }
}
