package com.order_service.order_service.service;

import com.order_service.order_service.repository.OrderLineRepository;
import org.springframework.stereotype.Service;

@Service
public class OrderLineService {

    OrderLineRepository orderLineRepository;

    public OrderLineService(OrderLineRepository orderLineRepository) {
        this.orderLineRepository = orderLineRepository;
    }
}
