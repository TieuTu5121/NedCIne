package com.nthao.nedcine.repository;


import com.nthao.nedcine.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
