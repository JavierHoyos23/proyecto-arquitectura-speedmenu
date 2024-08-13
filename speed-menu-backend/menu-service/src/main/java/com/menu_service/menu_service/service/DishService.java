package com.menu_service.menu_service.service;

import com.menu_service.menu_service.repository.DishRepository;
import org.springframework.stereotype.Service;

@Service
public class DishService {

    DishRepository dishRepository;

    public DishService(DishRepository dishRepository) {
        this.dishRepository = dishRepository;
    }
}
