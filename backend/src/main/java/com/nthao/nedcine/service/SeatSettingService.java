package com.nthao.nedcine.service;

import com.nthao.nedcine.dto.seatSetting.SeatSettingRequestDto;
import com.nthao.nedcine.dto.seatSetting.SeatSettingResponseDto;
import com.nthao.nedcine.entity.Showtime;

import java.util.List;

public interface SeatSettingService {

    SeatSettingResponseDto getSeatSettingById(int id);

    List<SeatSettingResponseDto> getAllSeatSetting();

    SeatSettingResponseDto createSeatSetting(SeatSettingRequestDto seatSettingRequestDto);

    SeatSettingResponseDto updateSeatSetting(int id, SeatSettingRequestDto seatSettingRequestDto);

    void deleteSeatSetting(int id);

    List<SeatSettingResponseDto> getSeatSettingByShowTime(Showtime showtime);
}
