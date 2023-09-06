package com.nedCinema.backend.service;

import com.nedCinema.backend.entity.ProductOrderInfo;

import java.util.List;

public interface ProductOrderInfoService {
    ProductOrderInfo createProductOrderInfo(ProductOrderInfo productOrderInfo);

    void deleteProductOrderInfo(int id);

    ProductOrderInfo updateProductOrderInfo(int id, ProductOrderInfo updatedProductOrderInfo);

    List<ProductOrderInfo> getAllProductOrderInfo();

}
