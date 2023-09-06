package com.nedCinema.backend.service;

import com.nedCinema.backend.entity.ShowTimes;

import java.sql.Time;
import java.util.List;

public interface ShowTimesService {
    ShowTimes addShowTime(ShowTimes showTime);
    void deleteShowTime(int id);
    List<ShowTimes> getAllShowTimes();
    ShowTimes updateShowTime(int id, ShowTimes updatedShowTime);
    List<ShowTimes> getByStartTime(Time startTime);
}
