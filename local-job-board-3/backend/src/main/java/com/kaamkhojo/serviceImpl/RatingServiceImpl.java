package com.kaamkhojo.serviceImpl;

import com.kaamkhojo.dto.request.RatingRequest;
import com.kaamkhojo.dto.response.RatingResponse;
import com.kaamkhojo.exception.BadRequestException;
import com.kaamkhojo.exception.ResourceNotFoundException;
import com.kaamkhojo.model.Job;
import com.kaamkhojo.model.Rating;
import com.kaamkhojo.model.User;
import com.kaamkhojo.repository.JobRepository;
import com.kaamkhojo.repository.RatingRepository;
import com.kaamkhojo.repository.UserRepository;
import com.kaamkhojo.service.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RatingServiceImpl implements RatingService {

    private final RatingRepository ratingRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;

    @Override
    @Transactional
    public RatingResponse submitRating(RatingRequest request, String reviewerEmail) {
        // Get reviewer
        User reviewer = userRepository.findByEmail(reviewerEmail)
            .orElseThrow(() -> new ResourceNotFoundException("Reviewer not found"));

        // Get reviewed user
        User reviewedUser = userRepository.findById(request.getReviewedUserId())
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Cannot rate yourself
        if (reviewer.getId().equals(reviewedUser.getId())) {
            throw new BadRequestException("You cannot rate yourself");
        }

        // Validate stars
        if (request.getStars() < 1 || request.getStars() > 5) {
            throw new BadRequestException("Stars must be between 1 and 5");
        }

        // Get associated job if provided
        Job job = null;
        if (request.getJobId() != null) {
            job = jobRepository.findById(request.getJobId()).orElse(null);
        }

        // Save rating
        Rating rating = Rating.builder()
            .reviewer(reviewer)
            .reviewedUser(reviewedUser)
            .job(job)
            .stars(request.getStars())
            .comment(request.getComment())
            .build();

        rating = ratingRepository.save(rating);

        // Update user's average rating
        Double avgRating = ratingRepository.findAverageRatingByUser(reviewedUser);
        long count = ratingRepository.countByReviewedUser(reviewedUser);

        reviewedUser.setAverageRating(avgRating != null ? Math.round(avgRating * 10.0) / 10.0 : 0.0);
        reviewedUser.setRatingCount((int) count);
        userRepository.save(reviewedUser);

        return RatingResponse.from(rating);
    }

    @Override
    public List<RatingResponse> getRatingsByUser(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return ratingRepository.findByReviewedUserOrderByCreatedAtDesc(user)
            .stream()
            .map(RatingResponse::from)
            .collect(Collectors.toList());
    }
}
