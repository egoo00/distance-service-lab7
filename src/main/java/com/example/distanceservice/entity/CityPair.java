package com.example.distanceservice.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class CityPair {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "city1_id")
    private City city1;

    @ManyToOne
    @JoinColumn(name = "city2_id")
    private City city2;

    private double distance;
    private String unit;
}