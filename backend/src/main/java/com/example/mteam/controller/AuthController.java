package com.example.mteam.controller;

import com.example.mteam.dto.LoginRequest;
import com.example.mteam.dto.RegisterRequest;
import com.example.mteam.model.User;
import com.example.mteam.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepo;

    public AuthController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody RegisterRequest req) {

        if (userRepo.findByEmail(req.email).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email is already registered"
            );
        }

        User u = new User();
        u.setNickname(req.nickname);
        u.setEmail(req.email);
        u.setPassword(req.password);
        u.setBalance(BigDecimal.ZERO);
        u.setRegisterDate(LocalDateTime.now());

        userRepo.save(u);

        return Map.of(
                "message", "Registration successful"
        );
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginRequest req) {

        User u = userRepo.findByEmail(req.email)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "User not found"
                        )
                );

        if (!u.getPassword().equals(req.password)) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Incorrect password"
            );
        }

        return Map.of(
                "message", "Login successful",
                "user_id", u.getId()
        );
    }

    @PostMapping("/logout")
    public Map<String, String> logout() {
        return Map.of(
                "message", "Logout successful"
        );
    }
}
