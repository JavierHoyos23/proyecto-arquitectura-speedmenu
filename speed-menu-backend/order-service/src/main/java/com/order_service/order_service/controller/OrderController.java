package com.order_service.order_service.controller;

import com.order_service.order_service.model.Orders;
import com.order_service.order_service.repository.OrdersRepository;
import com.order_service.order_service.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    OrdersRepository ordersRepository;
    OrderService orderService;

    public OrderController(OrdersRepository ordersRepository, OrderService orderService) {
        this.ordersRepository = ordersRepository;
        this.orderService = orderService;
    }

    @PostMapping("/create")
    public ResponseEntity<Orders> createOrder(@RequestBody Orders orders) {
        return new ResponseEntity<>(ordersRepository.save(orders), HttpStatus.CREATED);
    }
}
