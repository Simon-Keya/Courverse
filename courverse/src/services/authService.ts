import api from './api';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    displayName: string;
  };
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (email: string, password: string, displayName: string): Promise<AuthResponse> => {
  const response = await api.post('/auth/register', { email, password, displayName });
  return response.data;
};

export const resetPassword = async (email: string): Promise<void> => {
  await api.post('/auth/reset-password', { email });
};
