package com.kaamkhojo.service;

import com.kaamkhojo.dto.request.RatingRequest;
import com.kaamkhojo.dto.response.RatingResponse;
import java.util.List;

public interface RatingService {
    RatingResponse submitRating(RatingRequest request, String reviewerEmail);
    List<RatingResponse> getRatingsByUser(Long userId);
}
