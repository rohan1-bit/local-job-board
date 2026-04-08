package com.kaamkhojo.controller;

import com.kaamkhojo.dto.request.JobRequest;
import com.kaamkhojo.dto.response.ApiResponse;
import com.kaamkhojo.dto.response.ApplicationResponse;
import com.kaamkhojo.dto.response.JobResponse;
import com.kaamkhojo.service.JobService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    // ===== GET ALL JOBS (public) =====
    @GetMapping
    public ResponseEntity<ApiResponse<List<JobResponse>>> getAllJobs() {
        List<JobResponse> jobs = jobService.getAllJobs();
        return ResponseEntity.ok(ApiResponse.success(jobs));
    }

    // ===== SEARCH JOBS (public) =====
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<JobResponse>>> searchJobs(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String location) {
        List<JobResponse> jobs = jobService.searchJobs(search, category, location);
        return ResponseEntity.ok(ApiResponse.success(jobs));
    }

    // ===== GET JOB BY ID (public) =====
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<JobResponse>> getJobById(@PathVariable Long id) {
        JobResponse job = jobService.getJobById(id);
        return ResponseEntity.ok(ApiResponse.success(job));
    }

    // ===== CREATE JOB (employer only) =====
    @PostMapping
    @PreAuthorize("hasAnyRole('EMPLOYER', 'ADMIN')")
    public ResponseEntity<ApiResponse<JobResponse>> createJob(
            @Valid @RequestBody JobRequest request,
            Authentication auth) {
        JobResponse job = jobService.createJob(request, auth.getName());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Job posted successfully!", job));
    }

    // ===== UPDATE JOB (employer only) =====
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('EMPLOYER', 'ADMIN')")
    public ResponseEntity<ApiResponse<JobResponse>> updateJob(
            @PathVariable Long id,
            @Valid @RequestBody JobRequest request,
            Authentication auth) {
        JobResponse job = jobService.updateJob(id, request, auth.getName());
        return ResponseEntity.ok(ApiResponse.success("Job updated successfully!", job));
    }

    // ===== DELETE JOB (employer only) =====
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('EMPLOYER', 'ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteJob(
            @PathVariable Long id,
            Authentication auth) {
        jobService.deleteJob(id, auth.getName());
        return ResponseEntity.ok(ApiResponse.success("Job deleted successfully!", null));
    }

    // ===== GET MY JOBS (employer) =====
    @GetMapping("/my-jobs")
    @PreAuthorize("hasAnyRole('EMPLOYER', 'ADMIN')")
    public ResponseEntity<ApiResponse<List<JobResponse>>> getMyJobs(Authentication auth) {
        List<JobResponse> jobs = jobService.getMyJobs(auth.getName());
        return ResponseEntity.ok(ApiResponse.success(jobs));
    }

    // ===== APPLY FOR JOB (worker only) =====
    @PostMapping("/{id}/apply")
    @PreAuthorize("hasAnyRole('WORKER', 'ADMIN')")
    public ResponseEntity<ApiResponse<ApplicationResponse>> applyForJob(
            @PathVariable Long id,
            Authentication auth) {
        ApplicationResponse application = jobService.applyForJob(id, auth.getName());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Applied successfully!", application));
    }

    // ===== GET APPLICANTS (employer only) =====
    @GetMapping("/{id}/applicants")
    @PreAuthorize("hasAnyRole('EMPLOYER', 'ADMIN')")
    public ResponseEntity<ApiResponse<List<ApplicationResponse>>> getApplicants(
            @PathVariable Long id,
            Authentication auth) {
        List<ApplicationResponse> applicants = jobService.getApplicants(id, auth.getName());
        return ResponseEntity.ok(ApiResponse.success(applicants));
    }

    // ===== UPDATE APPLICATION STATUS (employer only) =====
    @PutMapping("/applications/{applicationId}/status")
    @PreAuthorize("hasAnyRole('EMPLOYER', 'ADMIN')")
    public ResponseEntity<ApiResponse<Void>> updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestParam String status,
            Authentication auth) {
        jobService.updateApplicationStatus(applicationId, status, auth.getName());
        return ResponseEntity.ok(ApiResponse.success("Status updated!", null));
    }
}
