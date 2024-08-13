package com.menu_service.menu_service.controller;

import com.menu_service.menu_service.model.Dish;
import com.menu_service.menu_service.repository.DishRepository;
import com.menu_service.menu_service.service.DishService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DishController {

    DishRepository dishRepository;
    DishService dishService;

    public DishController(DishRepository dishRepository, DishService dishService) {
        this.dishRepository = dishRepository;
        this.dishService = dishService;
    }

    @GetMapping("/")
    public List<Dish> getAllDishes (){
        return dishRepository.findAll();
    }
}
