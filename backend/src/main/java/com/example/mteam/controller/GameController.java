package com.example.mteam.controller;

import com.example.mteam.dto.GameDTO;
import com.example.mteam.model.Game;
import com.example.mteam.repository.GameRepository;
import com.example.mteam.util.DateUtil;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
public class GameController {

    private final GameRepository gameRepo;

    public GameController(GameRepository gameRepo) {
        this.gameRepo = gameRepo;
    }

    @GetMapping
    public List<GameDTO> list() {

        return gameRepo.findAll().stream()
                .map(g -> new GameDTO(
                        g.getId(),
                        g.getName(),
                        g.getPhotoUrl(),
                        DateUtil.format(g.getReleaseDate()),
                        g.getDescription(),
                        g.getPrice()
                ))
                .toList();
    }

    @GetMapping("/{id}")
    public GameDTO detail(@PathVariable Long id) {

        Game g = gameRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Game not found"));

        return new GameDTO(
                g.getId(),
                g.getName(),
                g.getPhotoUrl(),
                DateUtil.format(g.getReleaseDate()),
                g.getDescription(),
                g.getPrice()
        );
    }
}
