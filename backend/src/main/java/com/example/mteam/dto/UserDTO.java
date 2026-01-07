package com.example.mteam.dto;

import java.math.BigDecimal;

public class UserDTO {
    public Long id;
    public String nickname;
    public String email;
    public String registerDate;
    public BigDecimal balance;

    public UserDTO(Long id, String nickname, String email, String registerDate, BigDecimal balance) {
        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.registerDate = registerDate;
        this.balance = balance;
    }
}
