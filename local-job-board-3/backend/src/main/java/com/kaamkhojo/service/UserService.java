package com.kaamkhojo.service;

import com.kaamkhojo.dto.request.UpdateProfileRequest;
import com.kaamkhojo.dto.response.ApplicationResponse;
import com.kaamkhojo.dto.response.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse getProfile(String email);
    UserResponse getUserById(Long id);
    UserResponse updateProfile(String email, UpdateProfileRequest request);
    List<ApplicationResponse> getMyApplications(String email);
}
