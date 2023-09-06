package com.nedCinema.backend.controller;

import com.nedCinema.backend.entity.ShowTimes;
import com.nedCinema.backend.service.ShowTimesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.util.List;

@RestController
@RequestMapping("/api/show-times")
public class ShowTimesController {

    private final ShowTimesService showTimesService;

    @Autowired
    public ShowTimesController(ShowTimesService showTimesService) {
        this.showTimesService = showTimesService;
    }

    @PostMapping
    public ResponseEntity<ShowTimes> addShowTime(@RequestBody ShowTimes showTime) {
        ShowTimes addedShowTime = showTimesService.addShowTime(showTime);
        return ResponseEntity.ok(addedShowTime);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShowTime(@PathVariable int id) {
        showTimesService.deleteShowTime(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<ShowTimes>> getAllShowTimes() {
        List<ShowTimes> showTimesList = showTimesService.getAllShowTimes();
        return ResponseEntity.ok(showTimesList);
    }

    @GetMapping("/by-start-time/{startTime}")
    public ResponseEntity<List<ShowTimes>> getByStartTime(@PathVariable Time startTime) {
        List<ShowTimes> showTimesList = showTimesService.getByStartTime(startTime);
        return ResponseEntity.ok(showTimesList);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ShowTimes> updateShowTime(@PathVariable int id, @RequestBody ShowTimes updatedShowTime) {
        ShowTimes updatedShowTimeResult = showTimesService.updateShowTime(id, updatedShowTime);
        return ResponseEntity.ok(updatedShowTimeResult);
    }
}
