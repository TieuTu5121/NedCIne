package com.nthao.nedcine.controller;

import com.nthao.nedcine.dto.cinema.CinemaCreateRequestDto;
import com.nthao.nedcine.dto.cinema.CinemaResponseDto;
import com.nthao.nedcine.dto.cinema.CinemaUpdateDto;
import com.nthao.nedcine.service.CinemaService;
import com.nthao.nedcine.util.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/api/v1/cinemas")
public class CinemaController {

    @Autowired
    CinemaService cinemaService;

    @GetMapping
    public Response getAllCinemas() {
        long start = System.currentTimeMillis();
        List<CinemaResponseDto> cinemaResponseDtos = cinemaService.getAllCinemas();
        return new Response(cinemaResponseDtos,start);
    }

    @GetMapping("/{id}")
    public Response getCinemaById(@PathVariable Integer id) {
        long start = System.currentTimeMillis();
        CinemaResponseDto cinemaResponseDto = cinemaService.getCinemaById(id);
        if (cinemaResponseDto == null) {
            return new Response(404, "Cinema not found", start);
        }

        return new Response(cinemaResponseDto, start);
    }

    @PostMapping
    public Response createCinema(@RequestBody CinemaCreateRequestDto cinemaCreateRequestDto) {
        long start = System.currentTimeMillis();
        CinemaResponseDto cinemaResponseDto = cinemaService.createCinema(cinemaCreateRequestDto);
        long took = System.currentTimeMillis() - start;
        return new Response(cinemaResponseDto, took);
    }

    @PutMapping("/{id}")
    public Response updateCinema(@PathVariable Integer id, @RequestBody CinemaUpdateDto updatedCinema) {
        long start = System.currentTimeMillis();
        cinemaService.updateCinema(id, updatedCinema);
        long took = System.currentTimeMillis() - start;
        return new Response(200, "Cinema updated successfully", took);
    }
    @GetMapping("/by-city")
    public Response getByCity(@RequestParam String city) {
        long start = System.currentTimeMillis();
        List<CinemaResponseDto> cinemaResponseDtos = cinemaService.getByCity(city);
        return new Response(cinemaResponseDtos,start);
    }
    @DeleteMapping("/{id}")
    public Response deleteCinema(@PathVariable Integer id) {
        long start = System.currentTimeMillis();
        cinemaService.deleteCinema(id);
        long took = System.currentTimeMillis() - start;
        return new Response(200, "Cinema deleted successfully", took);
    }
}
