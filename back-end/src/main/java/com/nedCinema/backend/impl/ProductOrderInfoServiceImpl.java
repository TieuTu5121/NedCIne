package com.nedCinema.backend.impl;

import com.nedCinema.backend.entity.Orders;
import com.nedCinema.backend.entity.ProductOrderInfo;
import com.nedCinema.backend.entity.Products;
import com.nedCinema.backend.repository.OrdersRepository;
import com.nedCinema.backend.repository.ProductOrderInfoRepository;
import com.nedCinema.backend.repository.ProductsRepository;
import com.nedCinema.backend.service.ProductOrderInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.nedCinema.backend.exception.NotFoundException;
import java.util.List;

@Service
public class ProductOrderInfoServiceImpl implements ProductOrderInfoService {

    private final ProductOrderInfoRepository productOrderInfoRepository;

    @Autowired
    public ProductOrderInfoServiceImpl(ProductOrderInfoRepository productOrderInfoRepository) {
        this.productOrderInfoRepository = productOrderInfoRepository;
    }
    @Autowired
    private ProductsRepository productRepository;

    @Autowired
    private OrdersRepository ordersRepository;

    @Override
    public ProductOrderInfo createProductOrderInfo(ProductOrderInfo productOrderInfo) {
        Products product = productRepository.findById(productOrderInfo.getOrderId().getId())
                .orElseThrow(NotFoundException::new);
        Orders order = ordersRepository.findById((productOrderInfo.getProduct().getId()))
                .orElseThrow(NotFoundException::new);
        productOrderInfo.setOrderId(order);
        productOrderInfo.setProduct(product);
        return productOrderInfoRepository.save(productOrderInfo);
    }

    @Override
    public void deleteProductOrderInfo(int id) {
        productOrderInfoRepository.deleteById(id);
    }

    @Override
    public ProductOrderInfo updateProductOrderInfo(int id, ProductOrderInfo updatedProductOrderInfo) {
        ProductOrderInfo existingProductOrderInfo = productOrderInfoRepository.findById(id)
                .orElseThrow(NotFoundException::new);

        existingProductOrderInfo.setProduct(updatedProductOrderInfo.getProduct());
        existingProductOrderInfo.setOrderId(updatedProductOrderInfo.getOrderId());
        existingProductOrderInfo.setPricePerItem(updatedProductOrderInfo.getPricePerItem());

        return productOrderInfoRepository.save(existingProductOrderInfo);
    }

    @Override
    public List<ProductOrderInfo> getAllProductOrderInfo() {
        return productOrderInfoRepository.findAll();
    }


}
