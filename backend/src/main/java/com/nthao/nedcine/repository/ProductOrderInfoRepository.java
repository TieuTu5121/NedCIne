package com.nthao.nedcine.repository;

import com.nthao.nedcine.entity.ProductOrderInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductOrderInfoRepository extends JpaRepository<ProductOrderInfo,Long> {
    List<ProductOrderInfo> findAllByOrderId(long orderId);
}
