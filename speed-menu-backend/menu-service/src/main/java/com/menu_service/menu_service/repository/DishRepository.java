package com.menu_service.menu_service.repository;

import com.menu_service.menu_service.model.Dish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface DishRepository extends JpaRepository<Dish, Long> {

    ArrayList<Dish> findAll();
    Optional<Dish> findById(Long id);
}
