package com.kaamkhojo.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RatingRequest {
    @NotNull
    private Long reviewedUserId;

    private Long jobId;

    @NotNull
    @Min(1) @Max(5)
    private Integer stars;

    private String comment;
}
