package com.nthao.nedcine.controller;

import com.nthao.nedcine.dto.seatSetting.SeatSettingRequestDto;
import com.nthao.nedcine.dto.seatSetting.SeatSettingResponseDto;
import com.nthao.nedcine.service.SeatSettingService;
import com.nthao.nedcine.util.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/api/v1/seat-settings")
public class SeatSettingController {

    @Autowired
    private SeatSettingService seatSettingService;

    public SeatSettingController(SeatSettingService seatSettingService) {
        this.seatSettingService = seatSettingService;
    }

    @GetMapping
    public Response getAllSeatSettings() {
        long start = System.currentTimeMillis();
        List<SeatSettingResponseDto> seatSettingResponseDtos = seatSettingService.getAllSeatSetting();
        return new Response(seatSettingResponseDtos, start);
    }

    @GetMapping ("/{id}")
    public Response getSeatSettingById(@PathVariable Integer id) {
        long start = System.currentTimeMillis();
        SeatSettingResponseDto seatSettingResponseDto = seatSettingService.getSeatSettingById(id);
        if (seatSettingResponseDto != null) {
            return new Response(seatSettingResponseDto, start);
        } else {
            return new Response(404, "SeatSetting not found", start);
        }
    }

    @PostMapping
    public Response createSeatSetting(@RequestBody SeatSettingRequestDto seatSettingRequestDto) {
        long start = System.currentTimeMillis();
        SeatSettingResponseDto seatSettingResponseDto = seatSettingService.createSeatSetting(seatSettingRequestDto);
        return new Response(seatSettingResponseDto, start);
    }

    @PutMapping ("/{id}")
    public Response updateSeatSetting(@PathVariable Integer id, @RequestBody SeatSettingRequestDto seatSettingRequestDto) {
        long start = System.currentTimeMillis();
        SeatSettingResponseDto seatSettingResponseDto = seatSettingService.updateSeatSetting(id, seatSettingRequestDto);
        if (seatSettingResponseDto != null) {
            return new Response(seatSettingResponseDto, start);
        } else {
            return new Response(404, "SeatSetting not found", start);
        }
    }

    @DeleteMapping ("/{id}")
    public Response deleteSeatSetting(@PathVariable Integer id) {
        long start = System.currentTimeMillis();
        seatSettingService.deleteSeatSetting(id);
        long took = System.currentTimeMillis() - start;
        return new Response(200, "SeatSetting deleted successfully", took);
    }

}
