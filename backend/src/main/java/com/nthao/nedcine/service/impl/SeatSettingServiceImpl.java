package com.nthao.nedcine.service.impl;

import com.nthao.nedcine.dto.seatSetting.SeatSettingRequestDto;
import com.nthao.nedcine.dto.seatSetting.SeatSettingResponseDto;
import com.nthao.nedcine.entity.SeatSetting;
import com.nthao.nedcine.entity.Showtime;
import com.nthao.nedcine.repository.SeatRepository;
import com.nthao.nedcine.repository.SeatSettingRepository;
import com.nthao.nedcine.service.SeatSettingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SeatSettingServiceImpl implements SeatSettingService {

    @Autowired
    private SeatSettingRepository seatSettingRepository;

    @Override
    public SeatSettingResponseDto getSeatSettingById(int id) {
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
                .showtime(seatSettingRequestDto.getShowtime())
                .seat(seatSettingRequestDto.getSeat())
                .build());

        return seatSettingMapper(newSeatSetting);
    }

    @Override
    public SeatSettingResponseDto updateSeatSetting(int id, SeatSettingRequestDto seatSettingRequestDto) {
        SeatSetting seatSetting = seatSettingRepository.findById(id).orElse(null);
        if (seatSetting != null) {
            seatSetting.setSeat(seatSettingRequestDto.getSeat());
            seatSetting.setShowtime(seatSettingRequestDto.getShowtime());
            seatSetting.setStatus(seatSettingRequestDto.getStatus());
            seatSettingRepository.save(seatSetting);
            return seatSettingMapper(seatSetting);
        }
        return null;
    }

    @Override
    public void deleteSeatSetting(int id) {
        seatSettingRepository.deleteById(id);
    }

    @Override
    public List<SeatSettingResponseDto> getSeatSettingByShowTime(Showtime showtime) {
        List<SeatSetting> seatSettings = seatSettingRepository.findByShowtime(showtime);
        List<SeatSettingResponseDto> seatSettingResponseDtos = new ArrayList<>();
        for (SeatSetting seatSetting : seatSettings) {
            seatSettingResponseDtos.add(seatSettingMapper(seatSetting));
        }
        return seatSettingResponseDtos;
    }

    private SeatSettingResponseDto seatSettingMapper(SeatSetting seatSetting) {
        return SeatSettingResponseDto.builder()
                .id(seatSetting.getId())
                .seat(seatSetting.getSeat())
                .showtime(seatSetting.getShowtime())
                .status(seatSetting.getStatus())
                .build();
    }


}
