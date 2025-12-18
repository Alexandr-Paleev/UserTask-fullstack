import { apiClient } from './apiClient'
import type { Task, CreateTaskPayload } from '../types/entities'

export async function getTasks(): Promise<Task[]> {
  const res = await apiClient.get<Task[]>('/task')
  return res.data
}

export async function createTask(payload: CreateTaskPayload): Promise<Task> {
  const res = await apiClient.post<Task>('/task', payload)
  return res.data
}

export async function deleteTask(taskId: number): Promise<unknown> {
  const res = await apiClient.delete(`/task/${taskId}`)
  return res.data
}


