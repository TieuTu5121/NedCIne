package com.nthao.nedcine.controller;

import com.nthao.nedcine.dto.product.ProductRequestDto;
import com.nthao.nedcine.dto.product.ProductResponseDto;
import com.nthao.nedcine.service.ProductService;
import com.nthao.nedcine.util.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/api/v1/products")
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping
    public Response getAllProducts() {
        long start = System.currentTimeMillis();
        List<ProductResponseDto> productResponseDtos = productService.getAllProducts();
        return new Response(productResponseDtos,start);
    }

    @GetMapping("/{id}")
    public Response getProductById(@PathVariable Integer id) {
        long start = System.currentTimeMillis();
        ProductResponseDto productResponseDto = productService.getProductById(id);
        if (productResponseDto == null) {
            return new Response(404, "Product not found", start);
        }
        long took = System.currentTimeMillis() - start;
        return new Response(productResponseDto, took);
    }

    @PostMapping
    public Response createProduct(@RequestBody ProductRequestDto productRequestDto) {
        long start = System.currentTimeMillis();
        ProductResponseDto productResponseDto = productService.createProduct(productRequestDto);
        long took = System.currentTimeMillis() - start;
        return new Response(productResponseDto, took);
    }

    @PutMapping("/{id}")
    public Response updateProduct(@PathVariable Integer id, @RequestBody ProductRequestDto productRequestDto) {
        long start = System.currentTimeMillis();
        productService.updateProduct(id, productRequestDto);
        long took = System.currentTimeMillis() - start;
        return new Response(200, "Product updated successfully", took);
    }

    @DeleteMapping("/{id}")
    public Response deleteProduct(@PathVariable Integer id) {
        long start = System.currentTimeMillis();
        productService.deleteProduct(id);
        long took = System.currentTimeMillis() - start;
        return new Response(200, "Product deleted successfully", took);
    }
}
