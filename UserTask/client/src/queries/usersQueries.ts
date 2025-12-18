import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'
import { getUsers, createUser, deleteUser } from '../api/usersApi'
import { userKeys } from '../api/queryKeys'
import type { CreateUserPayload, User } from '../types/entities'
import { getApiErrorMessage } from '../utils/getApiErrorMessage'
import type { AxiosError } from 'axios'

export function useUsersQuery() {
  return useQuery<User[]>({
    queryKey: userKeys.lists(),
    queryFn: getUsers,
  })
}

export function useCreateUserMutation() {
  const queryClient = useQueryClient()
  return useMutation<User, AxiosError, CreateUserPayload>({
    mutationFn: createUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: userKeys.all })
      notifications.show({ title: 'Success', message: 'User created', color: 'green' })
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

export function useDeleteUserMutation() {
  const queryClient = useQueryClient()
  return useMutation<unknown, AxiosError, number>({
    mutationFn: deleteUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: userKeys.all })
      notifications.show({ title: 'Success', message: 'User deleted', color: 'green' })
    },
    onError: (error) => {
      notifications.show({ title: 'Error', message: getApiErrorMessage(error), color: 'red' })
    },
  })
}


