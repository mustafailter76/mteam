package com.example.mteam.util;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class DateUtil {

    public static String format(LocalDateTime t) {
        return t == null ? null : t.toString();
    }

    public static String format(LocalDate d) {
        return d == null ? null : d.toString();
    }
}
