package com.nthao.nedcine.service.impl;

import com.nthao.nedcine.dto.product.ProductResponseDto;
import com.nthao.nedcine.dto.room.RoomRequestDto;
import com.nthao.nedcine.dto.room.RoomResponseDto;
import com.nthao.nedcine.entity.*;
import com.nthao.nedcine.repository.CinemaRepository;
import com.nthao.nedcine.repository.RoomRepository;
import com.nthao.nedcine.repository.SeatRepository;
import com.nthao.nedcine.repository.SeatSettingRepository;
import com.nthao.nedcine.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomServiceImpl implements RoomService {
    @Autowired
    RoomRepository roomRepository;
    @Autowired
    SeatRepository seatRepository;
    @Autowired
    SeatSettingRepository seatSettingRepository;
    @Autowired
    CinemaRepository cinemaRepository;

    public RoomServiceImpl(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public RoomResponseDto roomMapper(Room room) {
        // Tìm tất cả các ghế trong phòng chiếu có ID là 1
        List<Seat> seats = seatRepository.findSeatsByRoomId(room.getId());
        // Tạo danh sách ghế

        RoomResponseDto roomResponseDto = new RoomResponseDto().builder()
                .id(room.getId())
                .roomName(room.getRoomName())
                .cinema(room.getCinema())
                .seatQuantity(room.getSeatQuantity())
                .seats(seats)
                .build();

        return roomResponseDto;
    }

    @Override
    public List<RoomResponseDto> getAllRooms() {
        List<Room> rooms = roomRepository.findAll();
        List<RoomResponseDto> roomResponseDtos = new ArrayList<>();
        for (Room room : rooms) {
            roomResponseDtos.add(roomMapper(room));
        }
        return roomResponseDtos;
    }

    @Override
    public RoomResponseDto getRoomById(int id) {

        Room room = roomRepository.findById(id).get();
        if (room == null) {
            throw new RuntimeException("Room not exits");
        }
        return roomMapper(roomRepository.save(room));
    }

    public RoomResponseDto createRoom(RoomRequestDto room) {
        Room roomEntity = roomRepository.save(Room.builder()
                .roomName(room.getRoomName())
                .seatQuantity(room.getSeatQuantity())
                .cinema(room.getCinema())
                .build()
        );

        // Tạo danh sách ghế
        List<Seat> seats = new ArrayList<>();
        char row = 'A';
        int seatNumber = 1;
        for (int i = 0; i < room.getSeatQuantity(); i++) {
            Seat seat = new Seat();
            seat.setRow(row);
            seat.setSeatNumber(seatNumber);
            seat.setRoom(roomEntity);
            seats.add(seat);

            // Tăng số ghế trong hàng
            seatNumber++;

            // Nếu số ghế trong hàng đã đủ 15, thì chuyển sang hàng mới
            if (seatNumber == 16) {
                row++;

                seatNumber = 1;
            }
        }
        seatRepository.saveAll(seats);
        // Lưu phòng chiếu vào database
        roomEntity = roomRepository.save(roomEntity);

        // Trả về phòng chiếu đã tạo
        return roomMapper(roomEntity);
    }


    @Override
    public RoomResponseDto updateRoom(int id, RoomRequestDto room) {
        Room roomEntity = roomRepository.findById(id).get();
        if (roomEntity != null) {
            roomEntity.setRoomName(room.getRoomName());
            roomEntity.setCinema(room.getCinema());
            roomEntity.setSeatQuantity(room.getSeatQuantity());
        } else throw new RuntimeException("This room is not exist!!");
        return roomMapper(roomRepository.save(roomEntity));
    }

    @Override
    public List<RoomResponseDto> getRoomsByCinema(int cinemaId) {
        Cinema cinema = cinemaRepository.findById(cinemaId).get();
        List<Room> rooms = roomRepository.findAllByCinema(cinema);
        List<RoomResponseDto> roomResponseDtos = new ArrayList<>();
        for (Room room : rooms) {
            roomResponseDtos.add(roomMapper(room));
        }
        return roomResponseDtos;
    }


    @Override
    public void deleteRoom(int id) {
        Room roomEntity = roomRepository.findById(id).get();
        if (roomEntity != null) {
            // Tìm tất cả các ghế trong phòng chiếu có ID là id
            List<Seat> seats = seatRepository.findSeatsByRoomId(id);
//            List<SeatSetting> seatSettings = seatSettingRepository.findAllBySeat(seats.stream().map(Seat::getId).collect(Collectors.toList()));
//
//
//            seatSettingRepository.deleteAll(seatSettings);

            // Xóa tất cả các ghế
            seatRepository.deleteAll(seats);

            // Xóa phòng chiếu
            roomRepository.deleteById(id);
        } else throw new RuntimeException("This room is not exist!!");
    }

}
