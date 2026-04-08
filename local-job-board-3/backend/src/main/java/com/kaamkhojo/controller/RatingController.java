package com.kaamkhojo.controller;

import com.kaamkhojo.dto.request.RatingRequest;
import com.kaamkhojo.dto.response.ApiResponse;
import com.kaamkhojo.dto.response.RatingResponse;
import com.kaamkhojo.service.RatingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
@RequiredArgsConstructor
public class RatingController {

    private final RatingService ratingService;

    // ===== SUBMIT RATING =====
    @PostMapping
    public ResponseEntity<ApiResponse<RatingResponse>> submitRating(
            @Valid @RequestBody RatingRequest request,
            Authentication auth) {
        RatingResponse rating = ratingService.submitRating(request, auth.getName());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Rating submitted!", rating));
    }

    // ===== GET RATINGS FOR A USER =====
    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<RatingResponse>>> getRatings(@PathVariable Long userId) {
        List<RatingResponse> ratings = ratingService.getRatingsByUser(userId);
        return ResponseEntity.ok(ApiResponse.success(ratings));
    }
}
