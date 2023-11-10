package com.nthao.nedcine.service;

import com.nthao.nedcine.dto.seatSetting.SeatSettingRequestDto;
import com.nthao.nedcine.dto.seatSetting.SeatSettingResponseDto;
import com.nthao.nedcine.entity.Showtime;

import java.util.List;

public interface SeatSettingService {

    SeatSettingResponseDto getSeatSettingById(long id);

    List<SeatSettingResponseDto> getAllSeatSetting();

    SeatSettingResponseDto createSeatSetting(SeatSettingRequestDto seatSettingRequestDto);

    SeatSettingResponseDto updateSeatSetting(long id, SeatSettingRequestDto seatSettingRequestDto);

    void deleteSeatSetting(long id);

    List<SeatSettingResponseDto> getSeatSettingByShowTime(long showtime);
}
