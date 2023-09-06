package com.nedCinema.backend.repository;

import com.nedCinema.backend.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductsRepository extends JpaRepository<Products, Integer> {
    List<Products> findByCategory(String category);

    List<Products> findByDisplayName(String displayName);
}
