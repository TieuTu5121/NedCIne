package com.nthao.nedcine.service.impl;

import com.nthao.nedcine.dto.seatSetting.SeatSettingRequestDto;
import com.nthao.nedcine.dto.seatSetting.SeatSettingResponseDto;
import com.nthao.nedcine.entity.SeatSetting;
import com.nthao.nedcine.entity.Showtime;
import com.nthao.nedcine.repository.SeatRepository;
import com.nthao.nedcine.repository.SeatSettingRepository;
import com.nthao.nedcine.repository.ShowtimeRepository;
import com.nthao.nedcine.service.SeatSettingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SeatSettingServiceImpl implements SeatSettingService {

    @Autowired
    private SeatSettingRepository seatSettingRepository;
   @Autowired SeatRepository seatRepository;
    @Autowired ShowtimeRepository showtimeRepository;
    @Override
    public SeatSettingResponseDto getSeatSettingById(long id) {
        SeatSetting seatSetting = seatSettingRepository.findById(id).orElse(null);
        if (seatSetting != null) {
            return seatSettingMapper(seatSetting);
        }
        return null;
    }

    @Override
    public List<SeatSettingResponseDto> getAllSeatSetting() {
        List<SeatSetting> seatSettings = seatSettingRepository.findAll();
        List<SeatSettingResponseDto> seatSettingResponseDtos = new ArrayList<>();
        for (SeatSetting seatSetting : seatSettings) {
            seatSettingResponseDtos.add(seatSettingMapper(seatSetting));
        }
        return seatSettingResponseDtos;
    }

    @Override
    public SeatSettingResponseDto createSeatSetting(SeatSettingRequestDto seatSettingRequestDto) {

        SeatSetting newSeatSetting = seatSettingRepository.save(SeatSetting.builder()
                .status(seatSettingRequestDto.getStatus())
                .showtimeId(seatSettingRequestDto.getShowtime().getId())
                .seatId(seatSettingRequestDto.getSeat().getId())
                .build());

        return seatSettingMapper(newSeatSetting);
    }

    @Override
    public SeatSettingResponseDto updateSeatSetting(long id, SeatSettingRequestDto seatSettingRequestDto) {
        SeatSetting seatSetting = seatSettingRepository.findById(id).orElse(null);
        if (seatSetting != null) {
            seatSetting.setSeatId(seatSettingRequestDto.getSeat().getId());
            seatSetting.setShowtimeId(seatSettingRequestDto.getShowtime().getId());
            seatSetting.setStatus(seatSettingRequestDto.getStatus());
            seatSettingRepository.save(seatSetting);
            return seatSettingMapper(seatSetting);
        }
        return null;
    }

    @Override
    public void deleteSeatSetting(long id) {
        seatSettingRepository.deleteById(id);
    }

    @Override
    public List<SeatSettingResponseDto> getSeatSettingByShowTime(long showtime) {
        List<SeatSetting> seatSettings = seatSettingRepository.findByShowtimeId(showtime);
        List<SeatSettingResponseDto> seatSettingResponseDtos = new ArrayList<>();
        for (SeatSetting seatSetting : seatSettings) {
            seatSettingResponseDtos.add(seatSettingMapper(seatSetting));
        }
        return seatSettingResponseDtos;
    }

    private SeatSettingResponseDto seatSettingMapper(SeatSetting seatSetting) {
        return SeatSettingResponseDto.builder()
                .id(seatSetting.getId())
                .seat(seatRepository.findById((int)seatSetting.getSeatId()).get())
                .showtime(showtimeRepository.findById((int)seatSetting.getShowtimeId()).get())
                .status(seatSetting.getStatus())
                .build();
    }


}
