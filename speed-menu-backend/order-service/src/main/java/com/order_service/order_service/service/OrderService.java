package com.order_service.order_service.service;

import com.order_service.order_service.repository.OrdersRepository;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    OrdersRepository ordersRepository;

    public OrderService(OrdersRepository ordersRepository) {
        this.ordersRepository = ordersRepository;
    }

}
