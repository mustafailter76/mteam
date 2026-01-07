package com.example.mteam.controller;

import com.example.mteam.dto.PurchaseRequest;
import com.example.mteam.dto.BulkPurchaseRequest;
import com.example.mteam.model.Game;
import com.example.mteam.model.Library;
import com.example.mteam.model.User;
import com.example.mteam.repository.GameRepository;
import com.example.mteam.repository.LibraryRepository;
import com.example.mteam.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/purchases")
public class PurchaseController {

    private final UserRepository userRepo;
    private final GameRepository gameRepo;
    private final LibraryRepository libraryRepo;

    public PurchaseController(UserRepository userRepo,
                              GameRepository gameRepo,
                              LibraryRepository libraryRepo) {
        this.userRepo = userRepo;
        this.gameRepo = gameRepo;
        this.libraryRepo = libraryRepo;
    }

    @PostMapping
    public Map<String, String> buy(@RequestBody PurchaseRequest req) {

        User u = userRepo.findById(req.userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Game g = gameRepo.findById(req.gameId)
                .orElseThrow(() -> new IllegalArgumentException("Game not found"));

        if (libraryRepo.existsByUserIdAndGameId(u.getId(), g.getId())) {
            throw new IllegalArgumentException("Game already owned");
        }

        if (u.getBalance().compareTo(g.getPrice()) < 0) {
            throw new IllegalArgumentException("Insufficient balance");
        }

        u.setBalance(u.getBalance().subtract(g.getPrice()));
        userRepo.save(u);

        Library l = new Library();
        l.setUser(u);
        l.setGame(g);
        l.setPurchaseDate(LocalDateTime.now());
        libraryRepo.save(l);

        return Map.of("message", "Purchase successful");
    }

    @PostMapping("/bulk")
    public Map<String, Object> bulkBuy(@RequestBody BulkPurchaseRequest req) {

        User u = userRepo.findById(req.userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        var games = gameRepo.findAllById(req.gameIds);

        if (games.size() != req.gameIds.size()) {
            throw new IllegalArgumentException("Some games not found");
        }

        for (Game g : games) {
            if (libraryRepo.existsByUserIdAndGameId(u.getId(), g.getId())) {
                throw new IllegalArgumentException(
                        "You already own: " + g.getName()
                );
            }
        }

        var total = games.stream()
                .map(Game::getPrice)
                .reduce(java.math.BigDecimal.ZERO, java.math.BigDecimal::add);

        if (games.size() >= 2) {
            total = total.multiply(new java.math.BigDecimal("0.8"));
        }

        if (u.getBalance().compareTo(total) < 0) {
            throw new IllegalArgumentException("Insufficient balance");
        }

        u.setBalance(u.getBalance().subtract(total));
        userRepo.save(u);

        for (Game g : games) {
            Library l = new Library();
            l.setUser(u);
            l.setGame(g);
            l.setPurchaseDate(LocalDateTime.now());
            libraryRepo.save(l);
        }

        return Map.of(
                "message", "Purchase successful",
                "newBalance", u.getBalance()
        );
    }
}
