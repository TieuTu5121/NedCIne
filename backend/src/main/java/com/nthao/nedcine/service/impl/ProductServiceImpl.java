package com.nthao.nedcine.service.impl;


import com.nthao.nedcine.dto.product.ProductRequestDto;
import com.nthao.nedcine.dto.product.ProductResponseDto;
import com.nthao.nedcine.entity.Product;
import com.nthao.nedcine.repository.ProductRepository;
import com.nthao.nedcine.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepository productsRepository;

    public ProductResponseDto productMapper(Product product) {
        return new ProductResponseDto()
                .builder()
                .id(product.getId())
                .name(product.getName())
                .photo(product.getPhoto())
                .price(product.getPrice())
                .quantity(product.getQuantity())
                .category(product.getCategory())
                .build();
    }


    @Override
    public List<ProductResponseDto> getAllProducts() {
        List<Product> products = productsRepository.findAll();
        List<ProductResponseDto> productResponseDtos = new ArrayList<>();
        for (Product product : products) {
            productResponseDtos.add(productMapper(product));
        }
        return productResponseDtos;
    }

    @Override
    public ProductResponseDto getProductById(int id) {

        Product product = productsRepository.getById(id);

        if (product == null) {
            throw new RuntimeException("Product not exits");
        }
        return productMapper(product);
    }

    @Override
    public ProductResponseDto createProduct(ProductRequestDto productRequestDto) {
        Product newProduct = productsRepository.save( new Product().builder()
                .name(productRequestDto.getName())
                .photo(productRequestDto.getPhoto())
                .price(productRequestDto.getPrice())
                .quantity(productRequestDto.getQuantity())
                .category(productRequestDto.getCategory())
                .build());
        return productMapper(newProduct);
    }

    @Override
    public ProductResponseDto updateProduct(int id, ProductRequestDto product) {
        Product existProduct = productsRepository.getById(id);
        if (existProduct != null) {
            existProduct.setName(product.getName());
            existProduct.setCategory(product.getCategory());
            existProduct.setPrice(product.getPrice());
            existProduct.setPhoto(product.getPhoto());
            existProduct.setQuantity(product.getQuantity());
        } else throw new RuntimeException("This product is not exist!!");
        return productMapper(existProduct);
    }

    @Override
    public void deleteProduct(int id) {
        productsRepository.deleteById(id);
    }
}
