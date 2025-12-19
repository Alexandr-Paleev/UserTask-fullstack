import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'
import { getTasks, createTask, deleteTask } from '../api/tasksApi'
import { taskKeys } from '../api/queryKeys'
import type { CreateTaskPayload, Task } from '../types/entities'
import { getApiErrorMessage } from '../utils/getApiErrorMessage'
import type { AxiosError } from 'axios'

export function useTasksQuery() {
  return useQuery<Task[]>({
    queryKey: taskKeys.lists(),
    queryFn: getTasks,
  })
}

export function useCreateTaskMutation() {
  const queryClient = useQueryClient()
  return useMutation<Task, AxiosError, CreateTaskPayload>({
    mutationFn: createTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: taskKeys.all })
      notifications.show({ title: 'Success', message: 'Task created', color: 'green' })
    },
    onError: (error) => {
      notifications.show({
        title: 'Error',
        message: getApiErrorMessage(error),
        color: 'red',
      })
    },
  })
}

export function useDeleteTaskMutation() {
  const queryClient = useQueryClient()
  return useMutation<unknown, AxiosError, number>({
    mutationFn: deleteTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: taskKeys.all })
      notifications.show({ title: 'Success', message: 'Task deleted', color: 'green' })
    },
    onError: (error) => {
      notifications.show({ title: 'Error', message: getApiErrorMessage(error), color: 'red' })
    },
  })
}
