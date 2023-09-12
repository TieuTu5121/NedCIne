package com.nedCinema.backend.impl;

import com.nedCinema.backend.entity.ProductOrderInfo;
import com.nedCinema.backend.entity.Rooms;
import com.nedCinema.backend.entity.ShowtimeSettings;
import com.nedCinema.backend.exception.NotFoundException;
import com.nedCinema.backend.repository.RoomsRepository;
import com.nedCinema.backend.repository.ShowtimeSettingsRepository;
import com.nedCinema.backend.service.ShowtimeSettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ShowtimeSettingsServiceImpl implements ShowtimeSettingsService {
    @Autowired
    private ShowtimeSettingsRepository showtimeSettingsRepository;
    @Autowired
    private RoomsRepository roomRepo;
    @Override
    public void addShowtimeSetting(ShowtimeSettings showtimeSetting) {
        Rooms room = roomRepo.findById(showtimeSetting.getRoom().getId())
                .orElseThrow(NotFoundException::new);
        showtimeSetting.setRoom(room);
        showtimeSettingsRepository.save(showtimeSetting);
    }

    @Override
    public List<ShowtimeSettings> getShowtimeSettingByShowDate(Date showDate) {
        return showtimeSettingsRepository.findByShowDate(showDate);
    }

    @Override
    public List<ShowtimeSettings> getShowtimeSettings() {
        return showtimeSettingsRepository.findAll();
    }

    @Override
    public void deleteShowtimeSetting(int id) {
        showtimeSettingsRepository.deleteById(id);
    }

    @Override
    public ShowtimeSettings updateShowtimeSetting(int id, ShowtimeSettings showtimeSetting) {
        Optional<ShowtimeSettings> existingShowtimeSetting = showtimeSettingsRepository.findById(id);

        if (existingShowtimeSetting.isPresent()) {
            ShowtimeSettings updatedShowtimeSetting = existingShowtimeSetting.get();
            updatedShowtimeSetting.setRoom(showtimeSetting.getRoom());
            updatedShowtimeSetting.setShowDate(showtimeSetting.getShowDate());

            return showtimeSettingsRepository.save(updatedShowtimeSetting);
        } else {
            throw new NotFoundException(); // You need to implement the NotFoundException class
        }
    }

}
