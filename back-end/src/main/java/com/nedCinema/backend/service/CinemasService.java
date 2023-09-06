package com.nedCinema.backend.service;

import com.nedCinema.backend.entity.Cinemas;

import java.util.List;

public interface CinemasService {
    void addCinemas(Cinemas cinema);
    Cinemas updateCinema(int id, Cinemas cinema);
    void deleteCinema(int id);
    Cinemas getCinema(int id);
    Cinemas getCinema(String name);
    List<Cinemas> getAllCinemas();
}
