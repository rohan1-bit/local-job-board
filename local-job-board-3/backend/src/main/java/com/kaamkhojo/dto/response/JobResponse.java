package com.kaamkhojo.dto.response;

import com.kaamkhojo.model.Job;
import lombok.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JobResponse {
    private Long id;
    private String title;
    private String description;
    private String category;
    private String jobType;
    private String status;
    private String location;
    private String pincode;
    private Double salaryMin;
    private Double salaryMax;
    private String duration;
    private String requirements;
    private String contactPhone;
    private String contactName;
    private Integer applicantsCount;
    private Long employerId;
    private String employerName;
    private Double employerRating;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;

    public static JobResponse from(Job job) {
        return JobResponse.builder()
            .id(job.getId())
            .title(job.getTitle())
            .description(job.getDescription())
            .category(job.getCategory().name().toLowerCase())
            .jobType(job.getJobType() != null ? job.getJobType().name().toLowerCase().replace("_", "-") : null)
            .status(job.getStatus().name().toLowerCase())
            .location(job.getLocation())
            .pincode(job.getPincode())
            .salaryMin(job.getSalaryMin())
            .salaryMax(job.getSalaryMax())
            .duration(job.getDuration())
            .requirements(job.getRequirements())
            .contactPhone(job.getContactPhone())
            .contactName(job.getContactName())
            .applicantsCount(job.getApplicantsCount())
            .employerId(job.getEmployer().getId())
            .employerName(job.getEmployer().getName())
            .employerRating(job.getEmployer().getAverageRating())
            .createdAt(job.getCreatedAt())
            .expiresAt(job.getExpiresAt())
            .build();
    }
}
