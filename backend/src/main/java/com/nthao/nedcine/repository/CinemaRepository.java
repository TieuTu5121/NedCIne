package com.nthao.nedcine.repository;

import com.nthao.nedcine.entity.Cinema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CinemaRepository extends JpaRepository<Cinema, Integer> {
    // Các phương thức truy vấn cụ thể nếu cần

    @Query("select cine from Cinema cine where  cine.city = :city")
    List<Cinema> findByCity(String city);
}
