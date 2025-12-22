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



