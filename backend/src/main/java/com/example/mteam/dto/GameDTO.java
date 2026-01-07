package com.example.mteam.dto;

import java.math.BigDecimal;

public class GameDTO {
    public Long id;
    public String name;
    public String photoUrl;
    public String releaseDate;
    public String description;
    public BigDecimal price;

    public GameDTO(Long id, String name, String photoUrl, String releaseDate, String description, BigDecimal price) {
        this.id = id;
        this.name = name;
        this.photoUrl = photoUrl;
        this.releaseDate = releaseDate;
        this.description = description;
        this.price = price;
    }
}
