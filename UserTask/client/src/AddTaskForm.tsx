import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Group, Paper, Select, Stack, Textarea, TextInput, Title } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

import { useUsersQuery } from './queries/usersQueries'
import { useCreateTaskMutation } from './queries/tasksQueries'

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  address: z.string().min(1, 'Address is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  userId: z.string().min(1, 'User is required'),
})

type AddTaskFormValues = z.infer<typeof schema>

export default function AddTaskForm() {
  const usersQuery = useUsersQuery()
  const createTaskMutation = useCreateTaskMutation()

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddTaskFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      address: '',
      startTime: '',
      endTime: '',
      userId: '',
    },
  })

  const userOptions = (usersQuery.data ?? []).map((user) => ({
    value: user.id.toString(),
    label: `${user.firstname} ${user.lastname}`,
  }))

  const onSubmit = async (values: AddTaskFormValues) => {
    await createTaskMutation.mutateAsync({
      title: values.title,
      description: values.description,
      address: values.address,
      startTime: values.startTime,
      endTime: values.endTime,
      user: { id: Number(values.userId) },
    })
    reset()
  }

  return (
    <Paper withBorder p="md" radius="md" bg="var(--mantine-color-gray-0)">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Group mb="md">
          <IconPlus size={20} color="var(--mantine-color-green-6)" />
          <Title order={4}>New Task</Title>
        </Group>

        <Stack gap="sm">
          <TextInput
            label="Title"
            placeholder="e.g. Weekly Meeting"
            required
            {...register('title')}
            error={errors.title?.message}
          />

          <Textarea
            label="Description"
            placeholder="Task details..."
            required
            rows={2}
            {...register('description')}
            error={errors.description?.message}
          />

          <TextInput
            label="Address"
            placeholder="Office Room 302"
            required
            {...register('address')}
            error={errors.address?.message}
          />

          <Group grow>
            <TextInput
              type="time"
              label="Start Time"
              required
              {...register('startTime')}
              error={errors.startTime?.message}
            />
            <TextInput
              type="time"
              label="End Time"
              required
              {...register('endTime')}
              error={errors.endTime?.message}
            />
          </Group>

          <Controller
            name="userId"
            control={control}
            render={({ field }) => (
              <Select
                label="Assign to User"
                placeholder={usersQuery.isLoading ? 'Loading users...' : 'Select a user'}
                data={userOptions}
                required
                searchable
                disabled={usersQuery.isLoading || usersQuery.isError}
                name={field.name}
                value={field.value || null}
                onChange={(v) => field.onChange(v ?? '')}
                onBlur={field.onBlur}
                ref={field.ref}
                error={errors.userId?.message}
              />
            )}
          />

          <Button
            type="submit"
            loading={isSubmitting || createTaskMutation.isPending}
            fullWidth
            mt="md"
            gradient={{ from: 'teal', to: 'lime', deg: 105 }}
            variant="gradient"
          >
            Create Task
          </Button>
        </Stack>
      </form>
    </Paper>
  )
}
