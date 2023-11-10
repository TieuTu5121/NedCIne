package com.nthao.nedcine.service.impl;

import com.nthao.nedcine.dto.showtime.ShowtimeBookingResponseDto;
import com.nthao.nedcine.dto.showtime.ShowtimeRequestBookingDto;
import com.nthao.nedcine.dto.showtime.ShowtimeRequestDto;
import com.nthao.nedcine.dto.showtime.ShowtimeResponseDto;

import com.nthao.nedcine.entity.*;
import com.nthao.nedcine.repository.*;

import com.nthao.nedcine.service.ShowtimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

//@EnableActuator
@Service
public class ShowtimeServiceImpl implements ShowtimeService {
    @Autowired
    ShowtimeRepository showtimeRepository;
    @Autowired
    SeatSettingRepository seatSettingRepository;
    @Autowired
    CinemaRepository cinemaRepository;
    @Autowired
    RoomRepository roomRepository;
    @Autowired
    SeatRepository seatRepository;

    public static ShowtimeResponseDto showtimeMapper(Showtime showtime) {
        return ShowtimeResponseDto.builder()
                .id(showtime.getId())
                .movie(showtime.getMovie())
                .room(showtime.getRoom())
                .showdate(showtime.getShowDate())
                .finishTime(showtime.getFinishTime())
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
                .finishTime(showtimeRequestDto.getFinishTime())
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
                    .showtimeId(newShowtime.getId())
                    .seatId(seat.getId())
                    .status("AVAILABLE")
                    .build();
            seatSettings.add(seatSetting);
        }

        // Lưu tất cả các SeatSetting
        seatSettingRepository.saveAll(seatSettings);

        return showtimeMapper(newShowtime);
    }
    public List<ShowtimeBookingResponseDto> getShowtimesByCityAndDate(ShowtimeRequestBookingDto showtimeRequestBookingDto) {
        List<Showtime> showtimes = showtimeRepository.getShowtimesByCityAndShowDate(
                showtimeRequestBookingDto.getDate(), showtimeRequestBookingDto.getCity(),showtimeRequestBookingDto.getMovieId());

        // Sử dụng Stream API để nhóm các Showtime theo Cinema
        Map<Cinema, List<Showtime>> showtimesByCinema = showtimes.stream()
                .collect(Collectors.groupingBy(showtime -> showtime.getRoom().getCinema()));

        // Sử dụng Builder để tạo đối tượng ShowtimeBookingResponseDto
        List<ShowtimeBookingResponseDto> result = new ArrayList<>();
        showtimesByCinema.forEach((cinema, showtimesInCinema) -> {
            result.add(ShowtimeBookingResponseDto.builder()
                    .cinema(cinema)
                    .showtimes(showtimesInCinema)
                    .build());
        });

        return result;
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
    public List<ShowtimeResponseDto> getShowtiemsByCinema(int cinemaId) {
        Cinema cinema = cinemaRepository.findById(cinemaId).get();
        List<Room> rooms = roomRepository.findAllByCinema(cinema);
        List<Showtime> showtimes = new ArrayList<>();
        for (Room room : rooms) {
            showtimes.addAll(showtimeRepository.getShowtimesByRoom(room));
        }

        // Chuyển đổi danh sách showtime thành danh sách showtime response DTO
        List<ShowtimeResponseDto> showtimeResponseDtos = new ArrayList<>();
        for (Showtime showtime : showtimes) {
            ShowtimeResponseDto showtimeResponseDto = new ShowtimeResponseDto();
            showtimeResponseDto.setId(showtime.getId());
            showtimeResponseDto.setMovie(showtime.getMovie());
            showtimeResponseDto.setRoom(showtime.getRoom());
            showtimeResponseDto.setShowtime(showtime.getStartTime());
            showtimeResponseDto.setFinishTime(showtime.getFinishTime());
            showtimeResponseDto.setShowdate(showtime.getShowDate());
            showtimeResponseDto.setState(showtime.getState());
            showtimeResponseDto.setPrice(showtime.getPrice());

            showtimeResponseDtos.add(showtimeResponseDto);
        }

        return showtimeResponseDtos;
    }
    @Scheduled (cron = "0 0 0 * * ? UTC") // Chạy vào lúc 00:00:00 hàng ngày

    public void updateShowtimeStateDaily() {
        try {
            List<Showtime> showtimes = showtimeRepository.findAll();

            for (Showtime showtime : showtimes) {
                // Parse showDate and times to create Date objects
                String showDate = showtime.getShowDate();
                String startTime = showtime.getStartTime();
                String endTime = showtime.getFinishTime();
                Date startDate = new Date(showDate + "T" + startTime);
                Date endDate = new Date(showDate + "T" + endTime);
                Date currentDate = new Date();

                String state = "SCREENED"; // Assume default state is "SCREENED"

                if (startDate.after(currentDate)) {
                    state = "COMING";
                } else if (startDate.getDate() == currentDate.getDate() &&
                        startDate.getHours() <= currentDate.getHours() &&
                        endDate.getHours() > currentDate.getHours()) {
                    state = "SHOWING";
                }

                // Update the state of the showtime
                showtime.setState(state);
                showtimeRepository.save(showtime);
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Lỗi khi cập nhật trạng thái suất chiếu: " + e.getMessage());
        }
    }
    @Override
    public void deleteShowtime(int id) {
        Showtime showtime = showtimeRepository.findById(id).get();
        if (showtime != null) {
            // Tìm tất cả các ghế trong phòng chiếu có ID là id
            List<SeatSetting> seatSettings = seatSettingRepository.findByShowtimeId((long)showtime.getId());

            // Xóa tất cả các ghế
            seatSettingRepository.deleteAll(seatSettings);

            // Xóa phòng chiếu
            showtimeRepository.deleteById(id);
        }
    }

}
