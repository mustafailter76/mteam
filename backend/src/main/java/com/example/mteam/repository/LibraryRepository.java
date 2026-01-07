package com.example.mteam.repository;

import com.example.mteam.model.Library;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LibraryRepository extends JpaRepository<Library, Long> {
    List<Library> findByUserId(Long userId);
    boolean existsByUserIdAndGameId(Long userId, Long gameId);
}

