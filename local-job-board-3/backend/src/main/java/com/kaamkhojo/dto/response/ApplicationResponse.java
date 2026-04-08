package com.kaamkhojo.dto.response;

import com.kaamkhojo.model.JobApplication;
import lombok.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApplicationResponse {
    private Long id;
    private Long jobId;
    private String jobTitle;
    private String employerName;
    private String location;
    private Long workerId;
    private String workerName;
    private String workerPhone;
    private String status;
    private String message;
    private LocalDateTime appliedAt;

    public static ApplicationResponse from(JobApplication app) {
        return ApplicationResponse.builder()
            .id(app.getId())
            .jobId(app.getJob().getId())
            .jobTitle(app.getJob().getTitle())
            .employerName(app.getJob().getEmployer().getName())
            .location(app.getJob().getLocation())
            .workerId(app.getWorker().getId())
            .workerName(app.getWorker().getName())
            .workerPhone(app.getWorker().getPhone())
            .status(app.getStatus().name().toLowerCase())
            .message(app.getMessage())
            .appliedAt(app.getAppliedAt())
            .build();
    }
}
