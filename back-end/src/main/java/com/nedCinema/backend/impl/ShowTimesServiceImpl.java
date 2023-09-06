package com.nedCinema.backend.impl;

import com.nedCinema.backend.entity.Movies;
import com.nedCinema.backend.entity.ShowTimes;
import com.nedCinema.backend.entity.ShowtimeSettings;
import com.nedCinema.backend.exception.NotFoundException;
import com.nedCinema.backend.repository.MoviesRepository;
import com.nedCinema.backend.repository.RoomsRepository;
import com.nedCinema.backend.repository.ShowTimesRepository;
import com.nedCinema.backend.repository.ShowtimeSettingsRepository;
import com.nedCinema.backend.service.ShowTimesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.util.List;

@Service
public class ShowTimesServiceImpl implements ShowTimesService {

    private final ShowTimesRepository showTimesRepository;

    @Autowired
    public ShowTimesServiceImpl(ShowTimesRepository showTimesRepository) {
        this.showTimesRepository = showTimesRepository;
    }
    @Autowired
    private ShowtimeSettingsRepository showtimeSettingsRepository;

    @Autowired
    private MoviesRepository moviesRepository;

    @Override
    public ShowTimes addShowTime(ShowTimes showTime) {
        ShowtimeSettings showtimeSettings = showtimeSettingsRepository.findById(showTime.getStSetting().getId())
                .orElseThrow(NotFoundException::new);

        Movies movie = moviesRepository.findById(showTime.getMovie().getId())
                .orElseThrow(NotFoundException::new);

        showTime.setMovie(movie);
        showTime.setStSetting(showtimeSettings);
        return showTimesRepository.save(showTime);
    }

    @Override
    public void deleteShowTime(int id) {
        showTimesRepository.deleteById(id);
    }

    @Override
    public List<ShowTimes> getAllShowTimes() {
        return showTimesRepository.findAll();
    }

    @Override
    public ShowTimes updateShowTime(int id, ShowTimes updatedShowTime) {
        ShowTimes existingShowTime = showTimesRepository.findById(id)
                .orElseThrow(NotFoundException::new);

        existingShowTime.setMovie(updatedShowTime.getMovie());
        existingShowTime.setStSetting(updatedShowTime.getStSetting());
        existingShowTime.setStartTime(updatedShowTime.getStartTime());
        existingShowTime.setPrice(updatedShowTime.getPrice());

        return showTimesRepository.save(existingShowTime);
    }


    @Override
    public List<ShowTimes> getByStartTime(Time startTime) {
        return showTimesRepository.findByStartTime(startTime);
    }
}
