package com.nedCinema.backend.controller;

import com.nedCinema.backend.entity.ShowtimeSettings;
import com.nedCinema.backend.service.ShowtimeSettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/showtime-settings")
public class ShowtimeSettingsController {
    @Autowired
    private ShowtimeSettingsService showtimeSettingsService;

    @PostMapping
    public ResponseEntity<String> addShowtimeSetting(@RequestBody ShowtimeSettings showtimeSetting) {
        showtimeSettingsService.addShowtimeSetting(showtimeSetting);
        return ResponseEntity.ok("Showtime setting added successfully.");
    }

    @GetMapping("/by-date/{showDate}")
    public ResponseEntity<List<ShowtimeSettings>> getShowtimeSettingByShowDate(@PathVariable Date showDate) {
        List<ShowtimeSettings> showtimeSettings = showtimeSettingsService.getShowtimeSettingByShowDate(showDate);
        return ResponseEntity.ok(showtimeSettings);
    }


    @GetMapping
    public ResponseEntity<List<ShowtimeSettings>> getShowtimeSettings() {
        List<ShowtimeSettings> showtimeSettings = showtimeSettingsService.getShowtimeSettings();
        return ResponseEntity.ok(showtimeSettings);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteShowtimeSetting(@PathVariable int id) {
        showtimeSettingsService.deleteShowtimeSetting(id);
        return ResponseEntity.ok("Showtime setting deleted successfully.");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateShowtimeSetting(@PathVariable int id, @RequestBody ShowtimeSettings showtimeSetting) {
        ShowtimeSettings updatedShowtimeSetting = showtimeSettingsService.updateShowtimeSetting(id, showtimeSetting);
        return ResponseEntity.ok("Showtime setting updated successfully.");
    }
}
