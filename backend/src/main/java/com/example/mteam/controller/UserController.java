package com.example.mteam.controller;

import com.example.mteam.dto.UserDTO;
import com.example.mteam.model.User;
import com.example.mteam.repository.UserRepository;
import com.example.mteam.util.DateUtil;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserRepository userRepo;

    public UserController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    private User getUserById(Long id) {
        return userRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }


    @GetMapping("/me/{id}")
    public UserDTO me(@PathVariable Long id) {
        User u = getUserById(id);

        return new UserDTO(
                u.getId(),
                u.getNickname(),
                u.getEmail(),
                DateUtil.format(u.getRegisterDate()),
                u.getBalance()
        );
    }


    @PostMapping("/deposit")
    public Map<String, Object> deposit(@RequestBody Map<String, Object> body) {
        Long id = Long.valueOf(body.get("userId").toString());
        BigDecimal amount = new BigDecimal(body.get("amount").toString());

        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }

        User u = getUserById(id);
        u.setBalance(u.getBalance().add(amount));
        userRepo.save(u);

        return Map.of("balance", u.getBalance(), "message", "Deposit successful");
    }

    @PostMapping("/withdraw")
    public Map<String, Object> withdraw(@RequestBody Map<String, Object> body) {
        Long id = Long.valueOf(body.get("userId").toString());
        BigDecimal amount = new BigDecimal(body.get("amount").toString());

        User u = getUserById(id);

        if (u.getBalance().compareTo(amount) < 0) {
            throw new IllegalArgumentException("Insufficient balance");
        }

        u.setBalance(u.getBalance().subtract(amount));
        userRepo.save(u);

        return Map.of("balance", u.getBalance(), "message", "Withdraw successful");
    }

    @DeleteMapping("/delete/{id}")
    public Map<String, String> delete(@PathVariable Long id) {
        User u = getUserById(id);

        userRepo.delete(u);

        return Map.of("message", "User account deleted successfully");
    }
}