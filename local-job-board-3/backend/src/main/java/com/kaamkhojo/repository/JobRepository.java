package com.kaamkhojo.repository;

import com.kaamkhojo.model.Job;
import com.kaamkhojo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByStatusOrderByCreatedAtDesc(Job.Status status);

    List<Job> findByEmployerOrderByCreatedAtDesc(User employer);

    @Query("SELECT j FROM Job j WHERE j.status = 'OPEN' AND " +
           "(:category IS NULL OR j.category = :category) AND " +
           "(:location IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
           "(:search IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(j.description) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "ORDER BY j.createdAt DESC")
    List<Job> searchJobs(
        @Param("search") String search,
        @Param("category") Job.Category category,
        @Param("location") String location
    );

    @Query("SELECT j FROM Job j WHERE j.status = 'OPEN' AND " +
           "LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%')) " +
           "ORDER BY j.createdAt DESC")
    List<Job> findByLocation(@Param("location") String location);
}
