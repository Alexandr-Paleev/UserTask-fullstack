import {
  useMutation,
  useInfiniteQuery,
  useQueryClient,
  type InfiniteData,
} from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'
import { getTasks, createTask, deleteTask } from '../api/tasksApi'
import { taskKeys } from '../api/queryKeys'
import type { CreateTaskPayload, Task, PaginatedResponse } from '../types/entities'
import { getApiErrorMessage } from '../utils/getApiErrorMessage'
import type { AxiosError } from 'axios'

export function useTasksQuery() {
  return useInfiniteQuery<PaginatedResponse<Task>>({
    queryKey: taskKeys.lists(),
    queryFn: ({ pageParam }) => getTasks({ pageParam: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page * lastPage.limit < lastPage.total) {
        return lastPage.page + 1
      }
      return undefined
    },
  })
}

export function useCreateTaskMutation() {
  const queryClient = useQueryClient()
  return useMutation<Task, AxiosError, CreateTaskPayload>({
    mutationFn: createTask,
    onMutate: async (newTaskPayload) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.lists() })
      const previousData = queryClient.getQueryData(taskKeys.lists())

      queryClient.setQueryData(
        taskKeys.lists(),
        (old: InfiniteData<PaginatedResponse<Task>> | undefined) => {
          if (!old) return old
          const newPages = [...old.pages]
          // Create optimistic task
          const optimisticTask = {
            ...newTaskPayload,
            id: Math.random(), // Temporary ID
            isDemo: false,
            // We don't have full user info here easily without context, relying on backend for full data
            // But we can try to structure it to avoid null crashes if components expect it
            user: { id: newTaskPayload.user.id, firstname: '...', lastname: '...', address: '', phone: '' },
          } as unknown as Task

          if (newPages.length > 0) {
            newPages[0] = {
              ...newPages[0],
              content: [optimisticTask, ...newPages[0].content],
            }
          }
          return { ...old, pages: newPages }
        },
      )
      return { previousData }
    },
    onError: (_err, _newTask, context: any) => {
      if (context?.previousData) {
        queryClient.setQueryData(taskKeys.lists(), context.previousData)
      }
      notifications.show({
        title: 'Error',
        message: getApiErrorMessage(_err),
        color: 'red',
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() })
    },
    onSuccess: () => {
      notifications.show({ title: 'Success', message: 'Task created', color: 'green' })
    },
  })
}

export function useDeleteTaskMutation() {
  const queryClient = useQueryClient()
  return useMutation<unknown, AxiosError, number>({
    mutationFn: deleteTask,
    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.lists() })
      const previousData = queryClient.getQueryData(taskKeys.lists())

      queryClient.setQueryData(
        taskKeys.lists(),
        (old: InfiniteData<PaginatedResponse<Task>> | undefined) => {
          if (!old) return old
          const newPages = old.pages.map((page) => ({
            ...page,
            content: page.content.filter((task) => task.id !== taskId),
          }))
          return { ...old, pages: newPages }
        },
      )
      return { previousData }
    },
    onError: (error, _taskId, context: any) => {
      if (context?.previousData) {
        queryClient.setQueryData(taskKeys.lists(), context.previousData)
      }
      notifications.show({ title: 'Error', message: getApiErrorMessage(error), color: 'red' })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() })
    },
    onSuccess: () => {
      notifications.show({ title: 'Success', message: 'Task deleted', color: 'green' })
    },
  })
}
