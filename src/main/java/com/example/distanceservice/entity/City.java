package com.example.distanceservice.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double latitude;
    private double longitude;

    @OneToMany(mappedBy = "city1", cascade = CascadeType.ALL)
    private List<CityPair> cityPairs;
}