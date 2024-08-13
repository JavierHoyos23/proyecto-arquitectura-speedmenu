package com.order_service.order_service.controller;

import com.order_service.order_service.model.OrderLine;
import com.order_service.order_service.repository.OrderLineRepository;
import com.order_service.order_service.service.OrderLineService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class OrderLineController {

    OrderLineRepository orderLineRepository;
    OrderLineService orderLineService;

    public OrderLineController(OrderLineRepository orderLineRepository, OrderLineService orderLineService) {
        this.orderLineRepository = orderLineRepository;
        this.orderLineService = orderLineService;
    }

    @PostMapping("/order-line/create")
    public ResponseEntity<OrderLine> createOrderLine(@RequestBody OrderLine orderLine) {
        return new ResponseEntity<>(orderLineRepository.save(orderLine), HttpStatus.CREATED);
    }
}
