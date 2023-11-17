package com.nthao.nedcine.controller;


import com.nthao.nedcine.dto.showtime.ShowtimeBookingResponseDto;
import com.nthao.nedcine.dto.showtime.ShowtimeRequestBookingDto;
import com.nthao.nedcine.dto.showtime.ShowtimeRequestDto;
import com.nthao.nedcine.dto.showtime.ShowtimeResponseDto;
import com.nthao.nedcine.service.ShowtimeService;
import com.nthao.nedcine.util.PageDataResponse;
import com.nthao.nedcine.util.PageResponse;
import com.nthao.nedcine.util.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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

    @GetMapping("/get-by-cinema/{cinemaId}")
    public PageResponse getShowtimesByCinema(
            @PathVariable Integer cinemaId,
            @RequestParam(defaultValue = "1") long page
    ) {
        long start = System.currentTimeMillis();
        List<ShowtimeResponseDto> showtimeResponseDtos = showtimeService.getShowtiemsByCinema(cinemaId);
        long totalShowtimes = showtimeResponseDtos.size();

        // Tính toán số trang
        long totalPages = totalShowtimes / 10;
        if (totalShowtimes % 10 != 0) {
            totalPages += 1;
        }

        // Tạo đối tượng PageDataResponse
        PageDataResponse pageDataResponse = new PageDataResponse((long) 0, (long) 10, page, showtimeResponseDtos.stream()
                .skip((page - 1) * 10)
                .limit(10)
                .collect(Collectors.toList()));
        pageDataResponse.setTotalPage(totalPages);

        return new PageResponse(200, pageDataResponse, System.currentTimeMillis() - start);
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

    @PostMapping ("/get-by-cityAndShowDate")
    public Response getShowtimesByCityAndDate(@RequestBody ShowtimeRequestBookingDto showtimeRequestBookingDto) {
        long start = System.currentTimeMillis();
        try {
            List<ShowtimeBookingResponseDto> showtimes = showtimeService.getShowtimesByCityAndDate(showtimeRequestBookingDto);
            return new Response(showtimes, start);

        } catch (Exception e) {
            return new Response(404, e.getMessage(), start);

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
