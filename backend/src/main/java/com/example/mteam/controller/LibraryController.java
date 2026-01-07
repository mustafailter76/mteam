package com.example.mteam.controller;

import com.example.mteam.dto.LibraryDTO;
import com.example.mteam.repository.LibraryRepository;
import com.example.mteam.util.DateUtil;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/library")
public class LibraryController {

    private final LibraryRepository libraryRepo;

    public LibraryController(LibraryRepository libraryRepo) {
        this.libraryRepo = libraryRepo;
    }

    @GetMapping("/{userId}")
    public List<LibraryDTO> myLibrary(@PathVariable Long userId) {

        return libraryRepo.findByUserId(userId)
                .stream()
                .map(l -> new LibraryDTO(
                        l.getGame().getId(),
                        l.getGame().getName(),
                        l.getGame().getPhotoUrl(),
                        DateUtil.format(l.getPurchaseDate())
                ))
                .toList();
    }
}