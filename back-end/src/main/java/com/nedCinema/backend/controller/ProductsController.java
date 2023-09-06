package com.nedCinema.backend.controller;

import com.nedCinema.backend.entity.Products;
import com.nedCinema.backend.service.ProductsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductsController {

    private final ProductsService productsService;

    public ProductsController(ProductsService productsService) {
        this.productsService = productsService;
    }

    @GetMapping
    public ResponseEntity<List<Products>> getAllProducts() {
        List<Products> products = productsService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Products> getProductById(@PathVariable int id) {
        Products product = productsService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/by-category/{category}")
    public ResponseEntity<List<Products>> getProductsByCategory(@PathVariable String category) {
        List<Products> products = productsService.getProductsByCategory(category);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/by-display-name/{displayName}")
    public ResponseEntity<List<Products>> getProductsByDisplayName(@PathVariable String displayName) {
        List<Products> products = productsService.getProductsByDisplayName(displayName);
        return ResponseEntity.ok(products);
    }

    @PostMapping
    public ResponseEntity<Products> createProduct(@RequestBody Products product) {
        Products createdProduct = productsService.createProduct(product);
        return ResponseEntity.ok(createdProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Products> updateProduct(@PathVariable int id, @RequestBody Products updatedProduct) {
        Products product = productsService.updateProduct(id, updatedProduct);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int id) {
        productsService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
