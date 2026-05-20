import api from './axiosInstance';

export interface AuthPayload { email: string; password: string }
export interface AuthResponse { token: string }

export const register = (data: AuthPayload) =>
  api.post<AuthResponse>('/auth/register', data).then((r) => r.data);

export const login = (data: AuthPayload) =>
  api.post<AuthResponse>('/auth/login', data).then((r) => r.data);
