package com.nedCinema.backend.impl;

import com.nedCinema.backend.entity.Cinemas;
import com.nedCinema.backend.exception.InvalidInputException;
import com.nedCinema.backend.exception.NotFoundException;
import com.nedCinema.backend.repository.CinemasRepository;
import com.nedCinema.backend.service.CinemasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.http.HttpRequest;
import java.util.List;
import java.util.Optional;

@Service
public class CinemasServiceImpl implements CinemasService {
    @Autowired
    private CinemasRepository CinemasRepo;
    @Override
    public void addCinemas(Cinemas cinema){
        try{
            CinemasRepo.save(cinema);
        }catch (Exception e){
            throw new InvalidInputException();
        }
    };
    @Override
    public Cinemas updateCinema(int id, Cinemas cinema){
        try{
           Optional<Cinemas> optionalCinemas =  CinemasRepo.findById(id);
           Cinemas exitCine = optionalCinemas.get();
           try{
               exitCine.setName(cinema.getName());
               exitCine.setAddress(cinema.getAddress());
                return CinemasRepo.save(exitCine);
           }catch (Exception ex){
               throw new InvalidInputException();
           }
        }catch (Exception e){
            throw new NotFoundException();
        }
    };
    @Override
    public void deleteCinema(int id) {
        try {
            CinemasRepo.deleteById(id);
        } catch (Exception e) {
            throw new NotFoundException();
        }
    }

    @Override
    public Cinemas getCinema(int id) {
        return CinemasRepo.findById(id).orElseThrow(() -> new NotFoundException());
    }

    @Override
    public Cinemas getCinema(String name) {
        Optional<Cinemas> optionalCinema = Optional.ofNullable(CinemasRepo.findByName(name));
        if (optionalCinema.isPresent()) {
            return optionalCinema.get();
        } else {
            throw new NotFoundException();
        }
    }


    @Override
    public List<Cinemas> getAllCinemas() {
        return CinemasRepo.findAll();
    }
}
