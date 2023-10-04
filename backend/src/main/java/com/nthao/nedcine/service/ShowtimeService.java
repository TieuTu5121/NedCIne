package com.nthao.nedcine.service;

import com.nthao.nedcine.dto.showtime.ShowtimeRequestDto;
import com.nthao.nedcine.dto.showtime.ShowtimeResponseDto;

import java.util.List;

public interface ShowtimeService {

    List<ShowtimeResponseDto> getAllShowtimes();

    ShowtimeResponseDto getShowtimeById(int id);

    ShowtimeResponseDto createShowtime(ShowtimeRequestDto showtimeRequestDto);

    ShowtimeResponseDto updateShowtime(int id, ShowtimeRequestDto showtimeRequestDto);

    void deleteShowtime(int id);
}
