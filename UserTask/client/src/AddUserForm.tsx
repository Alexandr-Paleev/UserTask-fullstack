import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Group, Paper, Select, Stack, TextInput, Title } from '@mantine/core'
import { IconUserPlus } from '@tabler/icons-react'

import { useCitiesQuery } from './queries/citiesQueries'
import { useCreateUserMutation } from './queries/usersQueries'

const schema = z.object({
  firstname: z.string().min(1, 'Firstname is required'),
  lastname: z.string().min(1, 'Lastname is required'),
  address: z.string().min(1, 'Address is required'),
  phone: z.string().min(1, 'Phone is required'),
  cityId: z.string().min(1, 'City is required'),
})

type AddUserFormValues = z.infer<typeof schema>

export default function AddUserForm() {
  const citiesQuery = useCitiesQuery()
  const createUserMutation = useCreateUserMutation()

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddUserFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstname: '',
      lastname: '',
      address: '',
      phone: '',
      cityId: '',
    },
  })

  const cityOptions =
    citiesQuery.data && citiesQuery.data.length > 0
      ? citiesQuery.data.map((city) => ({
          value: city.title,
          label: city.title,
        }))
      : [
          { value: 'London', label: 'London' },
          { value: 'Paris', label: 'Paris' },
          { value: 'Berlin', label: 'Berlin' },
          { value: 'Rome', label: 'Rome' },
          { value: 'Madrid', label: 'Madrid' },
          { value: 'Vienna', label: 'Vienna' },
          { value: 'Prague', label: 'Prague' },
          { value: 'Warsaw', label: 'Warsaw' },
          { value: 'Amsterdam', label: 'Amsterdam' },
          { value: 'Brussels', label: 'Brussels' },
          { value: 'Kyiv', label: 'Kyiv' },
        ]

  const onSubmit = async (values: AddUserFormValues) => {
    await createUserMutation.mutateAsync({
      firstname: values.firstname,
      lastname: values.lastname,
      address: values.address,
      phone: values.phone,
      city: { title: values.cityId },
    })
    reset()
  }

  return (
    <Paper withBorder p="md" radius="md" bg="var(--mantine-color-gray-0)">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Group mb="md">
          <IconUserPlus size={20} color="var(--mantine-color-blue-6)" />
          <Title order={4}>New User</Title>
        </Group>

        <Stack gap="sm">
          <Group grow>
            <TextInput
              label="Firstname"
              placeholder="John"
              required
              {...register('firstname')}
              error={errors.firstname?.message}
            />
            <TextInput
              label="Lastname"
              placeholder="Doe"
              required
              {...register('lastname')}
              error={errors.lastname?.message}
            />
          </Group>

          <TextInput
            label="Address"
            placeholder="123 Main St"
            required
            {...register('address')}
            error={errors.address?.message}
          />

          <Group grow>
            <TextInput
              label="Phone"
              placeholder="555-0123"
              required
              {...register('phone')}
              error={errors.phone?.message}
            />

            <Controller
              name="cityId"
              control={control}
              render={({ field }) => (
                <Select
                  label="City"
                  placeholder={citiesQuery.isLoading ? 'Loading cities...' : 'Select a city'}
                  data={cityOptions}
                  required
                  searchable
                  disabled={citiesQuery.isLoading || citiesQuery.isError}
                  name={field.name}
                  value={field.value || null}
                  onChange={(v) => field.onChange(v ?? '')}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  error={errors.cityId?.message}
                />
              )}
            />
          </Group>

          <Button
            type="submit"
            loading={isSubmitting || createUserMutation.isPending}
            fullWidth
            mt="md"
            gradient={{ from: 'indigo', to: 'cyan' }}
            variant="gradient"
          >
            Create User
          </Button>
        </Stack>
      </form>
    </Paper>
  )
}
