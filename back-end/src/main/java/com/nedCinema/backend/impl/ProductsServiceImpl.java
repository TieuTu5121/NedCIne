package com.nedCinema.backend.impl;

import com.nedCinema.backend.entity.Products;
import com.nedCinema.backend.repository.ProductsRepository;
import com.nedCinema.backend.service.ProductsService;
import org.springframework.stereotype.Service;
import com.nedCinema.backend.exception.NotFoundException;


import java.util.List;

@Service
public class ProductsServiceImpl implements ProductsService {

    private final ProductsRepository productsRepository;

    public ProductsServiceImpl(ProductsRepository productsRepository) {
        this.productsRepository = productsRepository;
    }

    @Override
    public List<Products> getAllProducts() {
        return productsRepository.findAll();
    }

    @Override
    public Products getProductById(int id) {
        return productsRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    @Override
    public List<Products> getProductsByCategory(String category) {
        return productsRepository.findByCategory(category);
    }

    @Override
    public List<Products> getProductsByDisplayName(String displayName) {
        return productsRepository.findByDisplayName(displayName);
    }

    @Override
    public Products createProduct(Products product) {
        return productsRepository.save(product);
    }

    @Override
    public Products updateProduct(int id, Products updatedProduct) {
        Products existingProduct = productsRepository.findById(id)
                .orElseThrow(NotFoundException::new);

        existingProduct.setDisplayName(updatedProduct.getDisplayName());
        existingProduct.setCategory(updatedProduct.getCategory());
        existingProduct.setIsDeleted(updatedProduct.getIsDeleted());
        existingProduct.setPhoto(updatedProduct.getPhoto());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setQuantity(updatedProduct.getQuantity());

        return productsRepository.save(existingProduct);
    }


    @Override
    public void deleteProduct(int id) {
        if (productsRepository.existsById(id)) {
            productsRepository.deleteById(id);
        } else {
            throw new NotFoundException();
        }
    }
}
