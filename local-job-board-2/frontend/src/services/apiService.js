import api from './axiosConfig'

// ===== AUTH SERVICE =====
export const authService = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  logout: () => api.post('/auth/logout'),
}

// ===== JOB SERVICE =====
export const jobService = {
  getAllJobs: (params) => api.get('/jobs', { params }),
  getJobById: (id) => api.get(`/jobs/${id}`),
  createJob: (data) => api.post('/jobs', data),
  updateJob: (id, data) => api.put(`/jobs/${id}`, data),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
  searchJobs: (params) => api.get('/jobs/search', { params }),
  getMyJobs: () => api.get('/jobs/my-jobs'),
  applyForJob: (id) => api.post(`/jobs/${id}/apply`),
  getApplicants: (id) => api.get(`/jobs/${id}/applicants`),
}

// ===== USER SERVICE =====
export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  getUserById: (id) => api.get(`/users/${id}`),
  getMyApplications: () => api.get('/users/applications'),
}

// ===== RATING SERVICE =====
export const ratingService = {
  submitRating: (data) => api.post('/ratings', data),
  getRatings: (userId) => api.get(`/ratings/user/${userId}`),
}

// ===== CATEGORY SERVICE =====
export const categoryService = {
  getAll: () => api.get('/categories'),
}
