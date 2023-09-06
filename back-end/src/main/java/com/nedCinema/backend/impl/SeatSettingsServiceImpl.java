package com.nedCinema.backend.impl;

import com.nedCinema.backend.entity.SeatSettings;
import com.nedCinema.backend.entity.Seats;
import com.nedCinema.backend.entity.ShowTimes;
import com.nedCinema.backend.repository.SeatSettingsRepository;
import com.nedCinema.backend.repository.SeatsRepository;
import com.nedCinema.backend.repository.ShowTimesRepository;
import com.nedCinema.backend.repository.ShowtimeSettingsRepository;
import com.nedCinema.backend.service.SeatSettingsService;
import com.nedCinema.backend.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SeatSettingsServiceImpl implements SeatSettingsService {

    private final SeatSettingsRepository seatSettingsRepository;

    @Autowired
    public SeatSettingsServiceImpl(SeatSettingsRepository seatSettingsRepository) {


        this.seatSettingsRepository = seatSettingsRepository;
    }
    @Autowired
    private  SeatsRepository seatsRepository;
    @Autowired
    private ShowTimesRepository showTimesRepository;
    @Override
    public SeatSettings addSeatSetting(SeatSettings seatSetting) {
        Seats seat = seatsRepository.findById(seatSetting.getSeat().getId())
                .orElseThrow(NotFoundException::new);
        ShowTimes showTimes = showTimesRepository.findById(seatSetting.getShowTime().getId())
                .orElseThrow(NotFoundException::new);

        seatSetting.setShowTime(showTimes);
        seatSetting.setSeat(seat);
        return seatSettingsRepository.save(seatSetting);
    }

    @Override
    public void deleteSeatSetting(int id) {
        seatSettingsRepository.deleteById(id);
    }

    @Override
    public List<SeatSettings> getAllSeatSettings() {
        return seatSettingsRepository.findAll();
    }

    @Override
    public SeatSettings updateSeatSetting(int id, SeatSettings updatedSeatSetting) {
        SeatSettings existingSeatSetting = seatSettingsRepository.findById(id)
                .orElseThrow(NotFoundException::new);

        existingSeatSetting.setSeat(updatedSeatSetting.getSeat());
        existingSeatSetting.setShowTime(updatedSeatSetting.getShowTime());
        existingSeatSetting.setStatus(updatedSeatSetting.getStatus());

        return seatSettingsRepository.save(existingSeatSetting);
    }
}
