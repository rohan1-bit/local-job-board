package com.kaamkhojo.dto.request;

import lombok.Data;

@Data
public class UpdateProfileRequest {
    private String name;
    private String phone;
    private String location;
    private String pincode;
    private String skills;
    private String bio;
}
