package com.kaamkhojo.repository;

import com.kaamkhojo.model.Rating;
import com.kaamkhojo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByReviewedUserOrderByCreatedAtDesc(User user);

    @Query("SELECT AVG(r.stars) FROM Rating r WHERE r.reviewedUser = :user")
    Double findAverageRatingByUser(@Param("user") User user);

    long countByReviewedUser(User user);
}
