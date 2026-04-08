package com.kaamkhojo.serviceImpl;

import com.kaamkhojo.dto.request.LoginRequest;
import com.kaamkhojo.dto.request.RegisterRequest;
import com.kaamkhojo.dto.response.AuthResponse;
import com.kaamkhojo.dto.response.UserResponse;
import com.kaamkhojo.exception.BadRequestException;
import com.kaamkhojo.model.User;
import com.kaamkhojo.repository.UserRepository;
import com.kaamkhojo.security.JwtTokenProvider;
import com.kaamkhojo.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthResponse register(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already registered. Please login.");
        }

        // Parse role
        User.Role role;
        try {
            role = User.Role.valueOf(request.getRole().toUpperCase());
        } catch (IllegalArgumentException e) {
            role = User.Role.WORKER;
        }

        // Build and save user
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role(role)
                .location(request.getLocation())
                .pincode(request.getPincode())
                .skills(request.getSkills())
                .averageRating(0.0)
                .ratingCount(0)
                .isActive(true)
                .build();

        User savedUser = userRepository.save(user);

        // Generate JWT
        String token = jwtTokenProvider.generateTokenFromEmail(savedUser.getEmail());

        return AuthResponse.builder()
                .token(token)
                .user(UserResponse.from(savedUser))
                .build();
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        // Authenticate with Spring Security
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // Generate JWT
        String token = jwtTokenProvider.generateToken(authentication);

        // Fetch user details
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("User not found"));

        return AuthResponse.builder()
                .token(token)
                .user(UserResponse.from(user))
                .build();
    }
}
