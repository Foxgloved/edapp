// API client for backend communication
// Base URL from environment or default to localhost

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class APIClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    // Add auth token if exists
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async logout() {
    return this.request('/api/auth/logout', {
      method: 'POST',
    });
  }

  async getCurrentUser() {
    return this.request('/api/auth/me');
  }

  // Courses endpoints
  async getCourses(params?: { category?: string; level?: string; search?: string }) {
    const queryString = new URLSearchParams(params as any).toString();
    return this.request(`/api/courses${queryString ? `?${queryString}` : ''}`);
  }

  async getCourse(id: string) {
    return this.request(`/api/courses/${id}`);
  }

  async enrollInCourse(courseId: string) {
    return this.request(`/api/courses/${courseId}/enroll`, {
      method: 'POST',
    });
  }

  async getCourseProgress(courseId: string) {
    return this.request(`/api/courses/${courseId}/progress`);
  }

  // User endpoints
  async updateProfile(data: any) {
    return this.request('/api/users/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request('/api/users/me/password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  async deleteAccount() {
    return this.request('/api/users/me', {
      method: 'DELETE',
    });
  }

  // Enrollments
  async getMyEnrollments() {
    return this.request('/api/enrollments/me');
  }

  // Progress
  async updateProgress(courseId: string, lessonId: string, data: any) {
    return this.request(`/api/progress/${courseId}/lessons/${lessonId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Notifications
  async getNotifications() {
    return this.request('/api/notifications');
  }

  async markNotificationAsRead(id: string) {
    return this.request(`/api/notifications/${id}/read`, {
      method: 'PUT',
    });
  }

  async markAllNotificationsAsRead() {
    return this.request('/api/notifications/read-all', {
      method: 'PUT',
    });
  }

  // Certificates
  async getCertificates() {
    return this.request('/api/certificates');
  }

  async getCertificate(certificateId: string) {
    return this.request(`/api/certificates/${certificateId}`);
  }

  async generateCertificate(courseId: string) {
    return this.request(`/api/certificates/generate/${courseId}`, {
      method: 'POST',
    });
  }

  async getCertificateByCourse(courseId: string) {
    return this.request(`/api/certificates/course/${courseId}`);
  }

  async verifyCertificate(certificateNumber: string) {
    return this.request(`/api/certificates/verify/${certificateNumber}`);
  }

  // Leaderboard
  async getLeaderboard() {
    return this.request('/api/leaderboard');
  }

  // Achievements
  async getAchievements() {
    return this.request('/api/achievements');
  }
}

// Export singleton instance
export const api = new APIClient();

// Export class for testing
export { APIClient };
