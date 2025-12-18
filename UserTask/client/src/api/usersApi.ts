import { apiClient } from './apiClient'
import type { User, CreateUserPayload } from '../types/entities'

export async function getUsers(): Promise<User[]> {
  const res = await apiClient.get<User[]>('/user')
  return res.data
}

export async function createUser(payload: CreateUserPayload): Promise<User> {
  const res = await apiClient.post<User>('/user', payload)
  return res.data
}

export async function deleteUser(userId: number): Promise<unknown> {
  const res = await apiClient.delete(`/user/${userId}`)
  return res.data
}


