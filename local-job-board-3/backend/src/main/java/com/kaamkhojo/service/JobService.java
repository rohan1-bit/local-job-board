package com.kaamkhojo.service;

import com.kaamkhojo.dto.request.JobRequest;
import com.kaamkhojo.dto.response.ApplicationResponse;
import com.kaamkhojo.dto.response.JobResponse;

import java.util.List;

public interface JobService {
    List<JobResponse> getAllJobs();
    List<JobResponse> searchJobs(String search, String category, String location);
    JobResponse getJobById(Long id);
    JobResponse createJob(JobRequest request, String employerEmail);
    JobResponse updateJob(Long id, JobRequest request, String employerEmail);
    void deleteJob(Long id, String employerEmail);
    List<JobResponse> getMyJobs(String employerEmail);
    ApplicationResponse applyForJob(Long jobId, String workerEmail);
    List<ApplicationResponse> getApplicants(Long jobId, String employerEmail);
    void updateApplicationStatus(Long applicationId, String status, String employerEmail);
}
