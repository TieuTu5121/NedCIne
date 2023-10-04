package com.nthao.nedcine.service;

import com.nthao.nedcine.dto.product.ProductRequestDto;
import com.nthao.nedcine.dto.product.ProductResponseDto;
import com.nthao.nedcine.entity.Product;
import com.nthao.nedcine.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;


import java.util.List;

public interface ProductService {


    public List<ProductResponseDto> getAllProducts();

    public ProductResponseDto getProductById(int id);

    public ProductResponseDto createProduct(ProductRequestDto productRequestDto);

    public ProductResponseDto updateProduct(int id,ProductRequestDto product);

    public void deleteProduct(int id) ;
}
