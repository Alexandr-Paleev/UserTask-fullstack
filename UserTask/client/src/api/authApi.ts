import { apiClient } from './apiClient'

export type AuthResponse = {
  token: string
  accountId: number
}

export async function register(email: string, password: string): Promise<AuthResponse> {
  const res = await apiClient.post<AuthResponse>('/auth/register', { email, password })
  return res.data
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await apiClient.post<AuthResponse>('/auth/login', { email, password })
  return res.data
}

export async function requestPasswordReset(email: string): Promise<{ message: string }> {
  const res = await apiClient.post<{ message: string }>('/auth/forgot-password', { email })
  return res.data
}

export async function resetPassword(token: string, password: string): Promise<{ message: string }> {
  const res = await apiClient.post<{ message: string }>('/auth/reset-password', { token, password })
  return res.data
}




