package com.nthao.nedcine.controller;



import com.nthao.nedcine.dto.showtime.ShowtimeRequestDto;
import com.nthao.nedcine.dto.showtime.ShowtimeResponseDto;
import com.nthao.nedcine.service.ShowtimeService;
import com.nthao.nedcine.util.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/api/v1/showtimes")
public class ShowtimeController {

    @Autowired
    ShowtimeService showtimeService;

    public ShowtimeController(ShowtimeService showtimeService) {
        this.showtimeService = showtimeService;
    }

    @GetMapping
    public Response getAllShowtimes() {
        long start = System.currentTimeMillis();
        List<ShowtimeResponseDto> showtimeResponseDtos = showtimeService.getAllShowtimes();
        return new Response(showtimeResponseDtos, start);
    }

    @GetMapping ("/{id}")
    public Response getShowtimeById(@PathVariable Integer id) {
        long start = System.currentTimeMillis();
        ShowtimeResponseDto showtimeResponseDto = showtimeService.getShowtimeById(id);
        if (showtimeResponseDto != null) {
            return new Response(showtimeResponseDto, start);
        } else {
            return new Response(404, "Showtime not found", start);
        }
    }

    @PostMapping
    public Response createShowtime(@RequestBody ShowtimeRequestDto showtimeRequestDto) {
        long start = System.currentTimeMillis();
        ShowtimeResponseDto showtimeResponseDto = showtimeService.createShowtime(showtimeRequestDto);
        return new Response(showtimeResponseDto, start);
    }

    @PutMapping ("/{id}")
    public Response updateShowtime(@PathVariable Integer id, @RequestBody ShowtimeRequestDto showtimeRequestDto) {
        long start = System.currentTimeMillis();
        ShowtimeResponseDto showtimeResponseDto = showtimeService.updateShowtime(id, showtimeRequestDto);
        if (showtimeResponseDto != null) {
            return new Response(showtimeResponseDto, start);
        } else {
            return new Response(404, "Showtime not found", start);
        }
    }

    @DeleteMapping ("/{id}")
    public Response deleteShowtime(@PathVariable Integer id) {
        long start = System.currentTimeMillis();
        showtimeService.deleteShowtime(id);
        long took = System.currentTimeMillis() - start;
        return new Response(200, "Showtime deleted successfully", took);
    }

}
