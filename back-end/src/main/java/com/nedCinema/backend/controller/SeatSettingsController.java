package com.nedCinema.backend.controller;

import com.nedCinema.backend.entity.SeatSettings;
import com.nedCinema.backend.service.SeatSettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seat-settings")
public class SeatSettingsController {

    private final SeatSettingsService seatSettingsService;

    @Autowired
    public SeatSettingsController(SeatSettingsService seatSettingsService) {
        this.seatSettingsService = seatSettingsService;
    }

    @PostMapping
    public ResponseEntity<SeatSettings> addSeatSetting(@RequestBody SeatSettings seatSetting) {
        SeatSettings addedSeatSetting = seatSettingsService.addSeatSetting(seatSetting);
        return ResponseEntity.ok(addedSeatSetting);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeatSetting(@PathVariable int id) {
        seatSettingsService.deleteSeatSetting(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<SeatSettings>> getAllSeatSettings() {
        List<SeatSettings> seatSettingsList = seatSettingsService.getAllSeatSettings();
        return ResponseEntity.ok(seatSettingsList);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SeatSettings> updateSeatSetting(@PathVariable int id, @RequestBody SeatSettings updatedSeatSetting) {
        SeatSettings updatedSeatSettingResult = seatSettingsService.updateSeatSetting(id, updatedSeatSetting);
        return ResponseEntity.ok(updatedSeatSettingResult);
    }
}
