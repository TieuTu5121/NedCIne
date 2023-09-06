package com.nedCinema.backend.controller;

import com.nedCinema.backend.entity.Cinemas;
import com.nedCinema.backend.service.CinemasService;
import com.nedCinema.backend.exception.InvalidInputException;
import com.nedCinema.backend.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cinemas")
public class CinemasController {

    @Autowired
    private CinemasService cinemasService;

    @PostMapping
    public ResponseEntity<String> addCinema(@RequestBody Cinemas cinema) {
        try {
            cinemasService.addCinemas(cinema);
            return ResponseEntity.status(HttpStatus.CREATED).body("Successfully added cinema.");
        } catch (InvalidInputException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error when adding cinema.");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateCinema(@PathVariable int id, @RequestBody Cinemas cinema) {
        try {
            Cinemas updatedCinema = cinemasService.updateCinema(id, cinema);
            return ResponseEntity.ok("Successfully updated cinema.");
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cinema not found.");
        } catch (InvalidInputException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error when updating cinema.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCinema(@PathVariable int id) {
        try {
            cinemasService.deleteCinema(id);
            return ResponseEntity.ok("Successfully deleted cinema.");
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cinema not found.");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cinemas> getCinemaById(@PathVariable int id) {
        Cinemas cinema = cinemasService.getCinema(id);
        return ResponseEntity.ok(cinema);
    }

    @GetMapping("/byname/{name}")
    public ResponseEntity<Cinemas> getCinemaByName(@PathVariable String name) {
        try {
            Cinemas cinema = cinemasService.getCinema(name);
            return ResponseEntity.ok(cinema);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping
    public ResponseEntity<List<Cinemas>> getAllCinemas() {
        List<Cinemas> cinemas = cinemasService.getAllCinemas();
        return ResponseEntity.ok(cinemas);
    }
}
