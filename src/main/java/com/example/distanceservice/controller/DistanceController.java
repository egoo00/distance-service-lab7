\package com.example.distanceservice.controller;

import com.example.distanceservice.dto.DistanceResponse;
import com.example.distanceservice.service.DistanceService;
import com.example.distanceservice.service.RequestCounter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class DistanceController {
    private final DistanceService distanceService;
    private final RequestCounter requestCounter;

    @Autowired
    public DistanceController(DistanceService distanceService, RequestCounter requestCounter) {
        this.distanceService = distanceService;
        this.requestCounter = requestCounter;
    }

    @GetMapping("/distance")
    public DistanceResponse getDistance(@RequestParam String from, @RequestParam String to) {
        return distanceService.calculateDistance(from, to);
    }

    @PostMapping("/distance")
    public DistanceResponse addDistance(@RequestParam String from, @RequestParam String to) {
        return distanceService.calculateDistance(from, to);
    }

    @DeleteMapping("/distance")
    public void deleteDistance(@RequestParam String from, @RequestParam String to) {
    }

    @PutMapping("/distance")
    public DistanceResponse updateDistance(@RequestParam String from, @RequestParam String to, @RequestParam double newDistance) {
        return distanceService.calculateDistance(from, to);
    }

    @GetMapping("/counter")
    public int getRequestCount() {
        return requestCounter.getCount();
    }
}