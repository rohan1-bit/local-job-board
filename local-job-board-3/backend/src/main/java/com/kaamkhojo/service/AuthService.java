package com.kaamkhojo.service;

import com.kaamkhojo.dto.request.LoginRequest;
import com.kaamkhojo.dto.request.RegisterRequest;
import com.kaamkhojo.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
