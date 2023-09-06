package com.nedCinema.backend.controller;

import com.nedCinema.backend.entity.Movies;
import com.nedCinema.backend.service.MoviesService;
import com.nedCinema.backend.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MoviesController {

    @Autowired
    private MoviesService moviesService;

    @PostMapping
    public ResponseEntity<Movies> addMovie(@RequestBody Movies movie) {
        Movies addedMovie = moviesService.addMovie(movie);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedMovie);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMovie(@PathVariable int id) {
        try {
            moviesService.deleteMovie(id);
            return ResponseEntity.ok("Deleted movie with id: " + id);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Movie not found.");
        }
    }

    @GetMapping
    public ResponseEntity<List<Movies>> getAllMovies() {
        List<Movies> movies = moviesService.getAllMovies();
        return ResponseEntity.ok(movies);
    }

    @GetMapping("/byname/{title}")
    public ResponseEntity<Movies> getMovieByName(@PathVariable String title) {
        Movies movie = moviesService.getMovieByName(title);
        return ResponseEntity.ok(movie);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Movies> updateMovie(@PathVariable int id, @RequestBody Movies movie) {
        try {
            Movies updatedMovie = moviesService.updateMovie(id, movie);
            return ResponseEntity.ok(updatedMovie);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
