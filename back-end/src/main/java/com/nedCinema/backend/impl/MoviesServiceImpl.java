package com.nedCinema.backend.impl;

import com.nedCinema.backend.entity.Movies;
import com.nedCinema.backend.exception.NotFoundException;
import com.nedCinema.backend.repository.MoviesRepository;
import com.nedCinema.backend.service.MoviesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MoviesServiceImpl implements MoviesService {
    @Autowired
    private MoviesRepository moviesRepository;

    @Override
    public Movies addMovie(Movies movie) {
        return moviesRepository.save(movie);
    }

    @Override
    public void deleteMovie(int id) {
        if (moviesRepository.existsById(id)) {
            moviesRepository.deleteById(id);
        } else {
            throw new NotFoundException();
        }
    }

    @Override
    public List<Movies> getAllMovies() {
        return moviesRepository.findAll();
    }

    @Override
    public Movies getMovieByName(String title) {
        return moviesRepository.findByTitle(title);
    }

    @Override
    public Movies updateMovie(int id, Movies updatedMovie) {
        Movies existingMovie = moviesRepository.findById(id)
                .orElseThrow(NotFoundException::new);

        existingMovie.setTitle(updatedMovie.getTitle());
        existingMovie.setYear(updatedMovie.getYear());
        existingMovie.setRated(updatedMovie.getRated());
        existingMovie.setRunTime(updatedMovie.getRunTime());
        existingMovie.setGenres(updatedMovie.getGenres());
        existingMovie.setDirectors(updatedMovie.getDirectors());
        existingMovie.setActors(updatedMovie.getActors());
        existingMovie.setPlot(updatedMovie.getPlot());
        existingMovie.setLanguage(updatedMovie.getLanguage());
        existingMovie.setPoster(updatedMovie.getPoster());
        existingMovie.setTrailer(updatedMovie.getTrailer());
        existingMovie.setBanner(updatedMovie.getBanner());

        return moviesRepository.save(existingMovie);
    }

}
