package com.nedCinema.backend.service;

import com.nedCinema.backend.entity.ShowtimeSettings;

import java.util.Date;
import java.util.List;

public interface ShowtimeSettingsService {
    void addShowtimeSetting(ShowtimeSettings showtimeSetting);
    List<ShowtimeSettings> getShowtimeSettingByShowDate(Date showDate);
    List<ShowtimeSettings> getShowtimeSettings();
    void deleteShowtimeSetting(int id);
    ShowtimeSettings updateShowtimeSetting(int id, ShowtimeSettings showtimeSetting);
}
