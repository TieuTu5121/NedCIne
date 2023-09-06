package com.nedCinema.backend.service;

import com.nedCinema.backend.entity.SeatSettings;

import java.util.List;

public interface SeatSettingsService {
    SeatSettings addSeatSetting(SeatSettings seatSetting);
    void deleteSeatSetting(int id);
    List<SeatSettings> getAllSeatSettings();
    SeatSettings updateSeatSetting(int id, SeatSettings updatedSeatSetting);
}
