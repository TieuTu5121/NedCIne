package com.nedCinema.backend.controller;

import com.nedCinema.backend.entity.ProductOrderInfo;
import com.nedCinema.backend.service.ProductOrderInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product-order-info")
public class ProductOrderInfoController {

    private final ProductOrderInfoService productOrderInfoService;

    @Autowired
    public ProductOrderInfoController(ProductOrderInfoService productOrderInfoService) {
        this.productOrderInfoService = productOrderInfoService;
    }

    @PostMapping
    public ResponseEntity<ProductOrderInfo> createProductOrderInfo(@RequestBody ProductOrderInfo productOrderInfo) {
        ProductOrderInfo createdProductOrderInfo = productOrderInfoService.createProductOrderInfo(productOrderInfo);
        return ResponseEntity.ok(createdProductOrderInfo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductOrderInfo(@PathVariable int id) {
        productOrderInfoService.deleteProductOrderInfo(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductOrderInfo> updateProductOrderInfo(@PathVariable int id,
                                                                   @RequestBody ProductOrderInfo updatedProductOrderInfo) {
        ProductOrderInfo updatedInfo = productOrderInfoService.updateProductOrderInfo(id, updatedProductOrderInfo);
        return ResponseEntity.ok(updatedInfo);
    }

    @GetMapping
    public ResponseEntity<List<ProductOrderInfo>> getAllProductOrderInfo() {
        List<ProductOrderInfo> productOrderInfos = productOrderInfoService.getAllProductOrderInfo();
        return ResponseEntity.ok(productOrderInfos);
    }


}

