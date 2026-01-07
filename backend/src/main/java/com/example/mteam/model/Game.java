package com.example.mteam.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "games")
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "game_id")
    private Long id;

    private String name;

    @Column(name = "release_date")
    private LocalDate releaseDate;

    @Column(name = "photo_url")
    private String photoUrl;

    private BigDecimal price;
    private String description;

    public Long getId() { return id; }
    public String getName() { return name; }
    public LocalDate getReleaseDate() { return releaseDate; }
    public String getPhotoUrl() { return photoUrl; }
    public BigDecimal getPrice() { return price; }
    public String getDescription() { return description; }
}
