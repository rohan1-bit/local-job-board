package com.kaamkhojo.serviceImpl;

import com.kaamkhojo.dto.request.UpdateProfileRequest;
import com.kaamkhojo.dto.response.ApplicationResponse;
import com.kaamkhojo.dto.response.UserResponse;
import com.kaamkhojo.exception.ResourceNotFoundException;
import com.kaamkhojo.model.User;
import com.kaamkhojo.repository.JobApplicationRepository;
import com.kaamkhojo.repository.UserRepository;
import com.kaamkhojo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JobApplicationRepository applicationRepository;

    @Override
    public UserResponse getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return UserResponse.from(user);
    }

    @Override
    @Transactional
    public UserResponse updateProfile(String email, UpdateProfileRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (request.getName() != null && !request.getName().isBlank())
            user.setName(request.getName());
        if (request.getPhone() != null)
            user.setPhone(request.getPhone());
        if (request.getLocation() != null)
            user.setLocation(request.getLocation());
        if (request.getPincode() != null)
            user.setPincode(request.getPincode());
        if (request.getSkills() != null)
            user.setSkills(request.getSkills());
        if (request.getBio() != null)
            user.setBio(request.getBio());

        return UserResponse.from(userRepository.save(user));
    }

    @Override
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return UserResponse.from(user);
    }

    @Override
    public List<ApplicationResponse> getMyApplications(String email) {
        User worker = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return applicationRepository.findByWorkerOrderByAppliedAtDesc(worker)
                .stream().map(ApplicationResponse::from).collect(Collectors.toList());
    }

}
