package com.nthao.nedcine.service.impl;

import com.nthao.nedcine.dto.showtime.ShowtimeRequestDto;
import com.nthao.nedcine.dto.showtime.ShowtimeResponseDto;

import com.nthao.nedcine.entity.Seat;
import com.nthao.nedcine.entity.SeatSetting;
import com.nthao.nedcine.entity.Showtime;
import com.nthao.nedcine.repository.SeatRepository;
import com.nthao.nedcine.repository.SeatSettingRepository;
import com.nthao.nedcine.repository.ShowtimeRepository;

import com.nthao.nedcine.service.ShowtimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ShowtimeServiceImpl implements ShowtimeService {
    @Autowired
    ShowtimeRepository showtimeRepository;
    @Autowired
    SeatSettingRepository seatSettingRepository;

    @Autowired
    SeatRepository seatRepository;

    public static ShowtimeResponseDto showtimeMapper(Showtime showtime) {
        return ShowtimeResponseDto.builder()
                .id(showtime.getId())
                .movie(showtime.getMovie())
                .room(showtime.getRoom())
                .showdate(showtime.getShowDate())
                .showtime(showtime.getStartTime())
                .state(showtime.getState())
                .price(showtime.getPrice())
                .build();
    }

    @Override
    public List<ShowtimeResponseDto> getAllShowtimes() {
        List<Showtime> showtimes = showtimeRepository.findAll();
        List<ShowtimeResponseDto> showtimeResponseDtos = new ArrayList<>();
        for (Showtime showtime : showtimes) {
            showtimeResponseDtos.add(showtimeMapper(showtime));
        }
        return showtimeResponseDtos;
    }

    @Override
    public ShowtimeResponseDto getShowtimeById(int id) {
        Showtime showtime = showtimeRepository.findById(id).orElse(null);
        if (showtime != null) {
            return showtimeMapper(showtime);
        }
        return null;
    }

    @Override
    public ShowtimeResponseDto createShowtime(ShowtimeRequestDto showtimeRequestDto) {
        Showtime newShowtime = showtimeRepository.save(new Showtime()
                .builder()
                .Movie(showtimeRequestDto.getMovie())
                .room(showtimeRequestDto.getRoom())
                .startTime(showtimeRequestDto.getShowtime())
                .showDate(showtimeRequestDto.getShowdate())
                .state(showtimeRequestDto.getState())
                .price(showtimeRequestDto.getPrice())
                .build());

        // Tìm tất cả các ghế trong phòng chiếu
        List<Seat> seats = seatRepository.findSeatsByRoomId(showtimeRequestDto.getRoom().getId());

        // Tạo các SeatSetting cho tất cả các ghế
        List<SeatSetting> seatSettings = new ArrayList<>();
        for (Seat seat : seats) {
            SeatSetting seatSetting = new SeatSetting()
                    .builder()
                    .showtime(newShowtime)
                    .seat(seat)
                    .status("AVAILABLE")
                    .build();
            seatSettings.add(seatSetting);
        }

        // Lưu tất cả các SeatSetting
        seatSettingRepository.saveAll(seatSettings);

        return showtimeMapper(newShowtime);
    }


    @Override
    public ShowtimeResponseDto updateShowtime(int id, ShowtimeRequestDto showtimeRequestDto) {
        Showtime existingShowtime = showtimeRepository.findById(id).orElse(null);
        if (existingShowtime != null) {
            existingShowtime.setMovie(showtimeRequestDto.getMovie());
            existingShowtime.setRoom(showtimeRequestDto.getRoom());
            existingShowtime.setStartTime(showtimeRequestDto.getShowtime());
            existingShowtime.setShowDate(showtimeRequestDto.getShowdate());
            existingShowtime.setState(showtimeRequestDto.getState());
            existingShowtime.setPrice(showtimeRequestDto.getPrice());
            showtimeRepository.save(existingShowtime);
            return showtimeMapper(existingShowtime);
        }
        return null;
    }

    @Override
    public void deleteShowtime(int id) {
        Showtime showtime = showtimeRepository.findById(id).get();
        if (showtime != null) {
            // Tìm tất cả các ghế trong phòng chiếu có ID là id
            List<SeatSetting> seatSettings = seatSettingRepository.findByShowtime(showtime);

            // Xóa tất cả các ghế
            seatSettingRepository.deleteAll(seatSettings);

            // Xóa phòng chiếu
            showtimeRepository.deleteById(id);
        }
    }

}
