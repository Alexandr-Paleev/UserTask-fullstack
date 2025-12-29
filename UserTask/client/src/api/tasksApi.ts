import { apiClient } from './apiClient'
import type { Task, CreateTaskPayload, PaginatedResponse } from '../types/entities'

export async function getTasks({ pageParam = 1 }: { pageParam?: number }): Promise<PaginatedResponse<Task>> {
  const res = await apiClient.get<PaginatedResponse<Task>>('/task', {
    params: { page: pageParam, limit: 10 },
  })
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
