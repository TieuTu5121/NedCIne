package com.nedCinema.backend.repository;

import com.nedCinema.backend.entity.ProductOrderInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductOrderInfoRepository extends JpaRepository<ProductOrderInfo, Integer> {

}
