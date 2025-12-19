import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button, Group, Paper, Stack, Text, TextInput, Title } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { login, register } from '../api/authApi'
import { getApiErrorMessage } from '../utils/getApiErrorMessage'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters'),
})

type Values = z.infer<typeof schema>

type AuthGateProps = {
  children: React.ReactNode
}

export function AuthGate({ children }: AuthGateProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [isAuthed, setIsAuthed] = useState(Boolean(localStorage.getItem('auth_token')))

  const {
    register: rhfRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (values: Values) => {
    try {
      const result =
        mode === 'login'
          ? await login(values.email, values.password)
          : await register(values.email, values.password)

      localStorage.setItem('auth_token', result.token)
      notifications.show({ title: 'Success', message: 'Signed in', color: 'green' })
      setIsAuthed(true)
    } catch (e) {
      notifications.show({ title: 'Error', message: getApiErrorMessage(e), color: 'red' })
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    setIsAuthed(false)
  }

  useEffect(() => {
    const onLogout = () => setIsAuthed(false)
    window.addEventListener('auth:logout', onLogout)
    return () => window.removeEventListener('auth:logout', onLogout)
  }, [])

  if (isAuthed) {
    return (
      <>
        <Group justify="flex-end" mb="md">
          <Button variant="subtle" onClick={logout}>
            Logout
          </Button>
        </Group>
        {children}
      </>
    )
  }

  return (
    <Paper withBorder p="xl" radius="lg" shadow="md">
      <Stack gap="md">
        <Title order={2}>{mode === 'login' ? 'Login' : 'Register'}</Title>
        <Text c="dimmed">
          {mode === 'login'
            ? 'Sign in to see only your data (plus demo records).'
            : 'Create an account to manage your own users and tasks.'}
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="sm">
            <TextInput
              label="Email"
              placeholder="you@example.com"
              {...rhfRegister('email')}
              error={errors.email?.message}
            />
            <TextInput
              label="Password"
              type="password"
              placeholder="********"
              {...rhfRegister('password')}
              error={errors.password?.message}
            />

            <Button type="submit" loading={isSubmitting}>
              {mode === 'login' ? 'Login' : 'Register'}
            </Button>

            <Button
              type="button"
              variant="light"
              onClick={() => setMode((m) => (m === 'login' ? 'register' : 'login'))}
            >
              {mode === 'login' ? 'Need an account? Register' : 'Already have an account? Login'}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Paper>
  )
}
