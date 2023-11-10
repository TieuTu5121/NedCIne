package com.nthao.nedcine.service;

import com.nthao.nedcine.dto.showtime.ShowtimeBookingResponseDto;
import com.nthao.nedcine.dto.showtime.ShowtimeRequestBookingDto;
import com.nthao.nedcine.dto.showtime.ShowtimeRequestDto;
import com.nthao.nedcine.dto.showtime.ShowtimeResponseDto;

import java.util.List;

public interface ShowtimeService {

    List<ShowtimeResponseDto> getAllShowtimes();

    ShowtimeResponseDto getShowtimeById(int id);

    ShowtimeResponseDto createShowtime(ShowtimeRequestDto showtimeRequestDto);
    public  List<ShowtimeBookingResponseDto> getShowtimesByCityAndDate(ShowtimeRequestBookingDto showtimeBookingResponseDto);

    ShowtimeResponseDto updateShowtime(int id, ShowtimeRequestDto showtimeRequestDto);
    List<ShowtimeResponseDto> getShowtiemsByCinema (int cinemaId);
    void deleteShowtime(int id);
    void updateShowtimeStateDaily();
}
