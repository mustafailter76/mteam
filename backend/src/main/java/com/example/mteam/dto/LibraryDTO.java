package com.example.mteam.dto;

public class LibraryDTO {
    public Long gameId;
    public String name;
    public String photoUrl;
    public String purchaseDate;

    public LibraryDTO(Long gameId, String name, String photoUrl, String purchaseDate) {
        this.gameId = gameId;
        this.name = name;
        this.photoUrl = photoUrl;
        this.purchaseDate = purchaseDate;
    }
}
