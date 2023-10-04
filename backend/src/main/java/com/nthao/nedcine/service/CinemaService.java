package com.nthao.nedcine.service;

import com.nthao.nedcine.dto.cinema.CinemaCreateRequestDto;
import com.nthao.nedcine.dto.cinema.CinemaResponseDto;
import com.nthao.nedcine.dto.cinema.CinemaUpdateDto;
import com.nthao.nedcine.entity.Cinema;

import java.util.List;

public interface CinemaService {
    List<CinemaResponseDto> getAllCinemas();
    List<CinemaResponseDto> getByCity(String city);
    CinemaResponseDto getCinemaById(int id);

    CinemaResponseDto createCinema(CinemaCreateRequestDto cinema);

    CinemaResponseDto updateCinema(int id, CinemaUpdateDto updatedCinema);

    void deleteCinema(int id);
}
