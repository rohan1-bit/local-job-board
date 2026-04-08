package com.kaamkhojo.repository;

import com.kaamkhojo.model.Job;
import com.kaamkhojo.model.JobApplication;
import com.kaamkhojo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByWorkerOrderByAppliedAtDesc(User worker);
    List<JobApplication> findByJobOrderByAppliedAtDesc(Job job);
    boolean existsByJobAndWorker(Job job, User worker);
    Optional<JobApplication> findByJobAndWorker(Job job, User worker);
}
