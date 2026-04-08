package com.kaamkhojo.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class JobRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Category is required")
    private String category;

    private String jobType;

    @NotBlank(message = "Location is required")
    private String location;

    private String pincode;
    private Double salaryMin;
    private Double salaryMax;
    private String duration;
    private String requirements;
    private String contactPhone;
    private String contactName;
}
