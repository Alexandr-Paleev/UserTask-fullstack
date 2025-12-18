import React from 'react'
import {
  ActionIcon,
  AppShell,
  Box,
  Container,
  Grid,
  Group,
  Paper,
  rem,
  ScrollArea,
  Text,
  Title,
  Tooltip,
} from '@mantine/core'
import { IconListDetails, IconRefresh, IconUsers } from '@tabler/icons-react'

import AddTaskForm from './AddTaskForm'
import AddUserForm from './AddUserForm'
import TaskList from './TaskList'
import UserList from './UserList'
import { useTasksQuery, useDeleteTaskMutation } from './queries/tasksQueries'
import { useUsersQuery, useDeleteUserMutation } from './queries/usersQueries'

export default function App() {
  const usersQuery = useUsersQuery()
  const tasksQuery = useTasksQuery()

  const deleteUserMutation = useDeleteUserMutation()
  const deleteTaskMutation = useDeleteTaskMutation()

  const users = usersQuery.data ?? []
  const tasks = tasksQuery.data ?? []

  return (
    <AppShell header={{ height: 70 }} padding="md" bg="var(--mantine-color-gray-0)">
      <AppShell.Header>
        <Container size="xl" h="100%">
          <Group h="100%" justify="space-between">
            <Group>
              <Box
                p={8}
                bg="blue.6"
                style={{
                  borderRadius: rem(8),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconListDetails size={24} color="white" />
              </Box>
              <Title order={2} fw={900} style={{ letterSpacing: rem(-1) }}>
                UserTask{' '}
                <Text span c="blue.6" inherit>
                  Manager
                </Text>
              </Title>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="xl" py="xl">
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, lg: 6 }}>
              <Paper withBorder shadow="md" radius="lg" p="xl" bg="white">
                <Group justify="space-between" mb="lg">
                  <Group gap="xs">
                    <IconUsers size={24} color="var(--mantine-color-blue-6)" />
                    <Title order={3}>Users</Title>
                  </Group>
                  <Tooltip label="Refresh users">
                    <ActionIcon
                      variant="light"
                      size="lg"
                      onClick={() => usersQuery.refetch()}
                      loading={usersQuery.isFetching}
                      color="blue"
                    >
                      <IconRefresh size={18} />
                    </ActionIcon>
                  </Tooltip>
                </Group>

                <ScrollArea h={400} type="hover" offsetScrollbars>
                  <UserList users={users} onDelete={(id) => deleteUserMutation.mutate(id)} />
                </ScrollArea>

                <Box mt="md">
                  <AddUserForm />
                </Box>
              </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 12, lg: 6 }}>
              <Paper withBorder shadow="md" radius="lg" p="xl" bg="white">
                <Group justify="space-between" mb="lg">
                  <Group gap="xs">
                    <IconListDetails size={24} color="var(--mantine-color-green-6)" />
                    <Title order={3}>Tasks</Title>
                  </Group>
                  <Tooltip label="Refresh tasks">
                    <ActionIcon
                      variant="light"
                      size="lg"
                      onClick={() => tasksQuery.refetch()}
                      loading={tasksQuery.isFetching}
                      color="green"
                    >
                      <IconRefresh size={18} />
                    </ActionIcon>
                  </Tooltip>
                </Group>

                <ScrollArea h={400} type="hover" offsetScrollbars>
                  <TaskList tasks={tasks} onDelete={(id) => deleteTaskMutation.mutate(id)} />
                </ScrollArea>

                <Box mt="md">
                  <AddTaskForm />
                </Box>
              </Paper>
            </Grid.Col>
          </Grid>
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}


