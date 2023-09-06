package com.nedCinema.backend.service;

import com.nedCinema.backend.entity.Products;

import java.util.List;

public interface ProductsService {
    List<Products> getAllProducts();

    Products getProductById(int id);

    List<Products> getProductsByCategory(String category);

    List<Products> getProductsByDisplayName(String displayName);

    Products createProduct(Products product);

    Products updateProduct(int id, Products updatedProduct);

    void deleteProduct(int id);
}
