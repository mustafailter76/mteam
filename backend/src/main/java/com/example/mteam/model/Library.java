package com.example.mteam.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_games",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "game_id"}))
public class Library {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    @Column(name = "purchase_date")
    private LocalDateTime purchaseDate;

    public User getUser() { return user; }
    public Game getGame() { return game; }
    public LocalDateTime getPurchaseDate() { return purchaseDate; }

    public void setUser(User user) {
        this.user = user;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public void setPurchaseDate(LocalDateTime purchaseDate) {
        this.purchaseDate = purchaseDate;
    }
}

