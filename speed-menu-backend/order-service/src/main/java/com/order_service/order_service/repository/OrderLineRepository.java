package com.order_service.order_service.repository;

import com.order_service.order_service.model.OrderLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface OrderLineRepository extends JpaRepository<OrderLine, Long> {

    ArrayList<OrderLine> findAll();
    Optional<OrderLine> findById(Long id);
}
