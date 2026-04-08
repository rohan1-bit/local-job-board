package com.kaamkhojo.dto.response;

import com.kaamkhojo.model.User;
import lombok.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String role;
    private String location;
    private String pincode;
    private String skills;
    private String bio;
    private Double averageRating;
    private Integer ratingCount;
    private LocalDateTime createdAt;

    public static UserResponse from(User user) {
        return UserResponse.builder()
            .id(user.getId())
            .name(user.getName())
            .email(user.getEmail())
            .phone(user.getPhone())
            .role(user.getRole().name().toLowerCase())
            .location(user.getLocation())
            .pincode(user.getPincode())
            .skills(user.getSkills())
            .bio(user.getBio())
            .averageRating(user.getAverageRating())
            .ratingCount(user.getRatingCount())
            .createdAt(user.getCreatedAt())
            .build();
    }
}
