// API configuration and utilities
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface User {
  id: string;
  email: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
}

export interface RefreshResponse {
  access_token: string;
  token_type: string;
}

class AuthAPI {
  private getHeaders(token?: string) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    return headers;
  }

  async signup(data: SignupData): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Signup failed');
    }

    return response.json();
  }

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }

    return response.json();
  }

  async refreshToken(refreshToken: string): Promise<RefreshResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Token refresh failed');
    }

    return response.json();
  }

  async logout(refreshToken: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Logout failed');
    }
  }

  async getCurrentUser(token: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
      method: 'GET',
      headers: this.getHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to fetch user data');
    }

    return response.json();
  }
}

export const authAPI = new AuthAPI();
