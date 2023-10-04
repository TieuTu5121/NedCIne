package com.nthao.nedcine.service.impl;

import com.nthao.nedcine.contants.Status;
import com.nthao.nedcine.dto.movie.MovieRequestDto;
import com.nthao.nedcine.dto.movie.MovieResponseDto;
import com.nthao.nedcine.entity.Movie;
import com.nthao.nedcine.entity.UserEntity;
import com.nthao.nedcine.repository.MovieRepository;
import com.nthao.nedcine.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class MovieServiceImpl implements MovieService {
    @Autowired
    MovieRepository movieRepository;


    public MovieResponseDto movieMapper(Movie movie) {
        return new MovieResponseDto().builder()
                .id(movie.getId())
                .title(movie.getTitle())
                .year(movie.getYear())
                .rated(movie.getRated())
                .runTime(movie.getRunTime())
                .genres(movie.getGenres())
                .status(movie.getStatus().name())
                .directors(movie.getDirectors())
                .actors(movie.getActors())
                .plot(movie.getPlot())
                .language(movie.getLanguage())
                .poster(movie.getPoster())
                .trailer(movie.getTrailer())
                .release(movie.getRelease())
                .banner(movie.getBanner())
                .build();
    }

    @Override
    public List<MovieResponseDto> getAllMovies() {
        List<Movie> movies = movieRepository.findAll();
        List<MovieResponseDto> movieResponseDtos = new ArrayList<>();
        for (Movie movie : movies) {
            movieResponseDtos.add(movieMapper(movie));
        }
        return movieResponseDtos;
    }

    @Override
    public MovieResponseDto getMovieById(Integer id) {
        try {
            Movie movie = movieRepository.findById(id).orElse(null);
            MovieResponseDto movieResponseDto = movieMapper(movie);
            return movieResponseDto;
        } catch (Exception e) {
            throw new RuntimeException("Not Found Movie!!");
        }
    }

    @Override
    public MovieResponseDto createMovie(MovieRequestDto movieRequestDto) {

        Movie newMovie = movieRepository.save(new
                Movie().builder()
                .title(movieRequestDto.getTitle())
                .year(movieRequestDto.getYear())
                .rated(movieRequestDto.getRated())
                .runTime(movieRequestDto.getRunTime())
                .genres(movieRequestDto.getGenres())
                .status(Status.valueOf(movieRequestDto.getStatus()))
                .directors(movieRequestDto.getDirectors())
                .actors(movieRequestDto.getActors())
                .plot(movieRequestDto.getPlot())
                .language(movieRequestDto.getLanguage())
                .poster(movieRequestDto.getPoster())
                .trailer(movieRequestDto.getTrailer())
                .release(movieRequestDto.getRelease())
                .banner(movieRequestDto.getBanner())
                .build()
        );
        return movieMapper(newMovie);
    }

    @Override
    public void updateMovie(Integer id, MovieRequestDto movieRequestDto) {
        Movie movie = movieRepository.findById(id).orElse(null);
        if (movie == null) {
            return;
        }

        movie.setTitle(movieRequestDto.getTitle());
        movie.setYear(movieRequestDto.getYear());
        movie.setRated(movieRequestDto.getRated());
        movie.setRunTime(movieRequestDto.getRunTime());
        movie.setGenres(movieRequestDto.getGenres());
        movie.setStatus(Status.valueOf(movieRequestDto.getStatus()));
        movie.setDirectors(movieRequestDto.getDirectors());
        movie.setActors(movieRequestDto.getActors());
        movie.setPlot(movieRequestDto.getPlot());
        movie.setLanguage(movieRequestDto.getLanguage());
        movie.setPoster(movieRequestDto.getPoster());
        movie.setRelease(movieRequestDto.getRelease());
        movie.setTrailer(movieRequestDto.getTrailer());
        movie.setBanner(movieRequestDto.getBanner());

        movieRepository.save(movie);
    }


    @Override
    public void deleteMovie(Integer id) {
        movieRepository.deleteById(id);
    }
}
