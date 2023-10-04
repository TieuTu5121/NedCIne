    package com.nthao.nedcine.service.impl;



    import com.nthao.nedcine.dto.cinema.CinemaCreateRequestDto;
    import com.nthao.nedcine.dto.cinema.CinemaResponseDto;
    import com.nthao.nedcine.dto.cinema.CinemaUpdateDto;
    import com.nthao.nedcine.entity.Cinema;
    import com.nthao.nedcine.repository.CinemaRepository;
    import com.nthao.nedcine.service.CinemaService;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;

    import java.util.ArrayList;
    import java.util.List;

    @Service
    public class CinemaServiceImpl implements CinemaService {


        @Autowired
        CinemaRepository cinemaRepository;

        public CinemaResponseDto cinemaMapper(Cinema cinema) {
            return CinemaResponseDto.builder()
                    .id(cinema.getId())
                    .name(cinema.getName())
                    .city(cinema.getCity())
                    .address(cinema.getAddress())
                    // Thêm các trường khác của CinemaResponseDto nếu cần
                    .build();
        }
        @Override
        public List<CinemaResponseDto> getAllCinemas() {
            List<Cinema> cinemas = cinemaRepository.findAll();
            List<CinemaResponseDto> cinemaResponseDtos = new ArrayList<>();
            for (Cinema cinema : cinemas) {
                cinemaResponseDtos.add(cinemaMapper(cinema));
            }
            return cinemaResponseDtos;
        }
        @Override
        public List<CinemaResponseDto> getByCity(String city){
            List<Cinema> cinemas = cinemaRepository.findByCity(city);
            List<CinemaResponseDto> cinemaResponseDtos = new ArrayList<>();
            for (Cinema cinema : cinemas) {
                cinemaResponseDtos.add(cinemaMapper(cinema));
            }
            return cinemaResponseDtos;
        }
        @Override
        public CinemaResponseDto getCinemaById(int id) {
            Cinema cinema=  cinemaRepository.findById(id).orElse(null);

            return cinemaMapper(cinema);
        }

        @Override
        public CinemaResponseDto createCinema(CinemaCreateRequestDto cinemaCreateRequestDto) {

             Cinema newCinema = cinemaRepository.save(
                     new Cinema().builder()
                     .name(cinemaCreateRequestDto.getName())
                     .address(cinemaCreateRequestDto.getAddress())
                     .city(cinemaCreateRequestDto.getCity())
                     .build());
             return cinemaMapper(newCinema);
        }

        @Override
        public CinemaResponseDto updateCinema(int id, CinemaUpdateDto updatedCinema) {
            Cinema existingCinema = cinemaRepository.findById(id).orElse(null);
            if (existingCinema != null) {
                existingCinema.setName(updatedCinema.getName());
                existingCinema.setCity(updatedCinema.getCity());
                existingCinema.setAddress(updatedCinema.getAddress());
                // Cập nhật các trường khác nếu cần
                return cinemaMapper( cinemaRepository.save(existingCinema));
            }
            return null;
        }

        @Override
        public void deleteCinema(int id) {
            cinemaRepository.deleteById(id);
        }
    }
