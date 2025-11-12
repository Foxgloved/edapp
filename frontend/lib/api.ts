import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// API Functions
export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  register: (data: { email: string; password: string; name: string }) => 
    api.post('/auth/register', data),
  logout: () => api.post('/auth/logout'),
};

export const coursesAPI = {
  getAll: () => api.get('/courses'),
  getById: (id: string) => api.get(`/courses/${id}`),
  enroll: (courseId: string) => api.post(`/courses/${courseId}/enroll`),
  getMyCourses: () => api.get('/courses/my-courses'),
};

export const progressAPI = {
  getProgress: (courseId: string) => api.get(`/progress/${courseId}`),
  updateProgress: (courseId: string, lessonId: string) => 
    api.post(`/progress/${courseId}`, { lessonId }),
};

export const scheduleAPI = {
  getMySchedule: () => api.get('/schedule'),
  getUpcoming: () => api.get('/schedule/upcoming'),
};

export const assignmentAPI = {
  getAll: () => api.get('/assignments'),
  getById: (id: string) => api.get(`/assignments/${id}`),
  submit: (id: string, data: FormData) => 
    api.post(`/assignments/${id}/submit`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
};

export const leaderboardAPI = {
  getGlobal: () => api.get('/leaderboard'),
  getByCourse: (courseId: string) => api.get(`/leaderboard/${courseId}`),
};
