package com.order_service.order_service.repository;

import com.order_service.order_service.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Long> {

    ArrayList<Orders> findAll();
    Optional<Orders> findById(Long id);
}
