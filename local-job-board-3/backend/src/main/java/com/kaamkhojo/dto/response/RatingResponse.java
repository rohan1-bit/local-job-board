package com.kaamkhojo.dto.response;

import com.kaamkhojo.model.Rating;
import lombok.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RatingResponse {
    private Long id;
    private Long reviewerId;
    private String reviewerName;
    private Long reviewedUserId;
    private Integer stars;
    private String comment;
    private LocalDateTime createdAt;

    public static RatingResponse from(Rating rating) {
        return RatingResponse.builder()
            .id(rating.getId())
            .reviewerId(rating.getReviewer().getId())
            .reviewerName(rating.getReviewer().getName())
            .reviewedUserId(rating.getReviewedUser().getId())
            .stars(rating.getStars())
            .comment(rating.getComment())
            .createdAt(rating.getCreatedAt())
            .build();
    }
}
