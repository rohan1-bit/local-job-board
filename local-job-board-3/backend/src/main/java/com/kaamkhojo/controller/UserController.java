package com.kaamkhojo.controller;

import com.kaamkhojo.dto.request.UpdateProfileRequest;
import com.kaamkhojo.dto.response.ApiResponse;
import com.kaamkhojo.dto.response.ApplicationResponse;
import com.kaamkhojo.dto.response.UserResponse;
import com.kaamkhojo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // ===== GET MY PROFILE =====
    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<UserResponse>> getMyProfile(Authentication auth) {
        UserResponse user = userService.getProfile(auth.getName());
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    // ===== UPDATE MY PROFILE =====
    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<UserResponse>> updateProfile(
            @RequestBody UpdateProfileRequest request,
            Authentication auth) {
        UserResponse user = userService.updateProfile(auth.getName(), request);
        return ResponseEntity.ok(ApiResponse.success("Profile updated!", user));
    }

    // ===== GET USER BY ID (public) =====
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(@PathVariable Long id) {
        UserResponse user = userService.getUserById(id);
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    // ===== GET MY APPLICATIONS (worker only) =====
    @GetMapping("/applications")
    @PreAuthorize("hasAnyRole('WORKER', 'ADMIN')")
    public ResponseEntity<ApiResponse<List<ApplicationResponse>>> getMyApplications(Authentication auth) {
        List<ApplicationResponse> apps = userService.getMyApplications(auth.getName());
        return ResponseEntity.ok(ApiResponse.success(apps));
    }
}
