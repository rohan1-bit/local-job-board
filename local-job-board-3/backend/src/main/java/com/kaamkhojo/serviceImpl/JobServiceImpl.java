package com.kaamkhojo.serviceImpl;

import com.kaamkhojo.dto.request.JobRequest;
import com.kaamkhojo.dto.response.ApplicationResponse;
import com.kaamkhojo.dto.response.JobResponse;
import com.kaamkhojo.exception.BadRequestException;
import com.kaamkhojo.exception.ResourceNotFoundException;
import com.kaamkhojo.exception.UnauthorizedException;
import com.kaamkhojo.model.Job;
import com.kaamkhojo.model.JobApplication;
import com.kaamkhojo.model.User;
import com.kaamkhojo.repository.JobApplicationRepository;
import com.kaamkhojo.repository.JobRepository;
import com.kaamkhojo.repository.UserRepository;
import com.kaamkhojo.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;
    private final JobApplicationRepository applicationRepository;
    private final UserRepository userRepository;

    @Override
    public List<JobResponse> getAllJobs() {
        return jobRepository.findByStatusOrderByCreatedAtDesc(Job.Status.OPEN)
                .stream().map(JobResponse::from).collect(Collectors.toList());
    }

    @Override
    public JobResponse getJobById(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));
        return JobResponse.from(job);
    }

    @Override
    @Transactional
    public JobResponse createJob(JobRequest request, String employerEmail) {
        User employer = userRepository.findByEmail(employerEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (employer.getRole() != User.Role.EMPLOYER && employer.getRole() != User.Role.ADMIN) {
            throw new UnauthorizedException("Only employers can post jobs");
        }

        // Parse category
        Job.Category category;
        try {
            category = Job.Category.valueOf(request.getCategory().toUpperCase());
        } catch (IllegalArgumentException e) {
            category = Job.Category.OTHER;
        }

        // Parse jobType
        Job.JobType jobType = null;
        if (request.getJobType() != null) {
            try {
                jobType = Job.JobType.valueOf(request.getJobType().toUpperCase().replace("-", "_"));
            } catch (IllegalArgumentException e) {
                jobType = Job.JobType.GIG;
            }
        }

        Job job = Job.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .category(category)
                .jobType(jobType)
                .status(Job.Status.OPEN)
                .location(request.getLocation())
                .pincode(request.getPincode())
                .salaryMin(request.getSalaryMin())
                .salaryMax(request.getSalaryMax())
                .duration(request.getDuration())
                .requirements(request.getRequirements())
                .contactPhone(request.getContactPhone())
                .contactName(request.getContactName())
                .applicantsCount(0)
                .employer(employer)
                .build();

        Job saved = jobRepository.save(job);
        return JobResponse.from(saved);
    }

    @Override
    @Transactional
    public JobResponse updateJob(Long id, JobRequest request, String employerEmail) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));

        if (!job.getEmployer().getEmail().equals(employerEmail)) {
            throw new UnauthorizedException("You can only edit your own jobs");
        }

        if (request.getTitle() != null) job.setTitle(request.getTitle());
        if (request.getDescription() != null) job.setDescription(request.getDescription());
        if (request.getLocation() != null) job.setLocation(request.getLocation());
        if (request.getSalaryMin() != null) job.setSalaryMin(request.getSalaryMin());
        if (request.getSalaryMax() != null) job.setSalaryMax(request.getSalaryMax());
        if (request.getDuration() != null) job.setDuration(request.getDuration());
        if (request.getRequirements() != null) job.setRequirements(request.getRequirements());
        if (request.getContactPhone() != null) job.setContactPhone(request.getContactPhone());

        return JobResponse.from(jobRepository.save(job));
    }

    @Override
    @Transactional
    public void deleteJob(Long id, String employerEmail) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));

        User user = userRepository.findByEmail(employerEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!job.getEmployer().getEmail().equals(employerEmail) && user.getRole() != User.Role.ADMIN) {
            throw new UnauthorizedException("You can only delete your own jobs");
        }

        job.setStatus(Job.Status.DELETED);
        jobRepository.save(job);
    }

    @Override
    public List<JobResponse> searchJobs(String search, String category, String location) {
        Job.Category cat = null;
        if (category != null && !category.isBlank()) {
            try { cat = Job.Category.valueOf(category.toUpperCase()); }
            catch (IllegalArgumentException ignored) {}
        }

        String searchTerm = (search != null && search.isBlank()) ? null : search;
        String locationTerm = (location != null && location.isBlank()) ? null : location;

        return jobRepository.searchJobs(searchTerm, cat, locationTerm)
                .stream().map(JobResponse::from).collect(Collectors.toList());
    }

    @Override
    public List<JobResponse> getMyJobs(String employerEmail) {
        User employer = userRepository.findByEmail(employerEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return jobRepository.findByEmployerOrderByCreatedAtDesc(employer)
                .stream().map(JobResponse::from).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ApplicationResponse applyForJob(Long jobId, String workerEmail) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + jobId));

        User worker = userRepository.findByEmail(workerEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (job.getStatus() != Job.Status.OPEN) {
            throw new BadRequestException("This job is no longer accepting applications");
        }

        if (worker.getRole() == User.Role.EMPLOYER) {
            throw new BadRequestException("Employers cannot apply for jobs");
        }

        if (applicationRepository.existsByJobAndWorker(job, worker)) {
            throw new BadRequestException("You have already applied for this job");
        }

        JobApplication application = JobApplication.builder()
                .job(job)
                .worker(worker)
                .status(JobApplication.Status.PENDING)
                .build();

        applicationRepository.save(application);

        // Increment applicant count
        job.setApplicantsCount(job.getApplicantsCount() + 1);
        jobRepository.save(job);

        return ApplicationResponse.from(application);
    }

    @Override
    public List<ApplicationResponse> getApplicants(Long jobId, String employerEmail) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + jobId));

        if (!job.getEmployer().getEmail().equals(employerEmail)) {
            throw new UnauthorizedException("You can only view applicants for your own jobs");
        }

        return applicationRepository.findByJobOrderByAppliedAtDesc(job)
                .stream().map(ApplicationResponse::from).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void updateApplicationStatus(Long applicationId, String status, String employerEmail) {
        JobApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));

        if (!application.getJob().getEmployer().getEmail().equals(employerEmail)) {
            throw new UnauthorizedException("You can only update applications for your own jobs");
        }

        try {
            application.setStatus(JobApplication.Status.valueOf(status.toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid status: " + status);
        }

        applicationRepository.save(application);
    }
    
}
