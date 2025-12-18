import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { 
  AppShell, 
  Container, 
  Grid, 
  Title, 
  Paper, 
  Stack, 
  Group, 
  ScrollArea, 
  Text,
  ActionIcon,
  Tooltip,
  Box,
  rem
} from '@mantine/core';
import { IconRefresh, IconUsers, IconListDetails } from '@tabler/icons-react';
import UserList from './UserList';
import AddUserForm from './AddUserForm';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
const USER_SERVICE_URL = `${API_URL}/user`;
const TASK_SERVICE_URL = `${API_URL}/task`;

const App = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isFetchingUsers, setIsFetchingUsers] = useState(false);
  const [isFetchingTasks, setIsFetchingTasks] = useState(false);

  const fetchUsers = async () => {
    setIsFetchingUsers(true);
    try {
      const response = await axios.get(USER_SERVICE_URL);
      setUsers(response.data);
    } catch (e) {
      console.error(e);
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch users',
        color: 'red',
      });
    } finally {
      setIsFetchingUsers(false);
    }
  };

  const fetchTasks = async () => {
    setIsFetchingTasks(true);
    try {
      const response = await axios.get(TASK_SERVICE_URL);
      setTasks(response.data);
    } catch (e) {
      console.error(e);
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch tasks',
        color: 'red',
      });
    } finally {
      setIsFetchingTasks(false);
    }
  };

  const removeTask = async (id) => {
    try {
      await axios.delete(`${TASK_SERVICE_URL}/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
      notifications.show({
        title: 'Success',
        message: 'Task deleted successfully',
        color: 'green',
      });
    } catch (e) {
      console.error(e);
      notifications.show({
        title: 'Error',
        message: 'Failed to delete task',
        color: 'red',
      });
    }
  };

  const removeUser = async (id) => {
    try {
      await axios.delete(`${USER_SERVICE_URL}/${id}`);
      setUsers(users.filter(u => u.id !== id));
      notifications.show({
        title: 'Success',
        message: 'User deleted successfully',
        color: 'green',
      });
    } catch (e) {
      console.error(e);
      notifications.show({
        title: 'Error',
        message: 'Failed to delete user',
        color: 'red',
      });
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, []);

  return (
    <AppShell
      header={{ height: 70 }}
      padding="md"
      bg="var(--mantine-color-gray-0)"
    >
      <AppShell.Header>
        <Container size="xl" h="100%">
          <Group h="100%" justify="space-between">
            <Group>
              <Box 
                p={8} 
                bg="blue.6" 
                style={{ borderRadius: rem(8), display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <IconListDetails size={24} color="white" />
              </Box>
              <Title order={2} fw={900} style={{ letterSpacing: rem(-1) }}>
                UserTask <Text span c="blue.6" inherit>Manager</Text>
              </Title>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="xl" py="xl">
          <Grid gutter="xl">
            {/* Users Column */}
            <Grid.Col span={{ base: 12, lg: 6 }}>
              <Paper withBorder shadow="md" radius="lg" p="xl" bg="white">
                <Stack gap="lg">
                  <Group justify="space-between">
                    <Group gap="xs">
                      <IconUsers size={24} color="var(--mantine-color-blue-6)" />
                      <Title order={3}>Users</Title>
                    </Group>
                    <Tooltip label="Refresh users">
                      <ActionIcon 
                        variant="light" 
                        size="lg" 
                        onClick={fetchUsers} 
                        loading={isFetchingUsers}
                        color="blue"
                      >
                        <IconRefresh size={18} />
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                  
                  <ScrollArea h={400} type="hover" offsetScrollbars>
                    <UserList users={users} onDelete={removeUser} />
                  </ScrollArea>
                  
                  <Box mt="md">
                    <AddUserForm user_service_url={USER_SERVICE_URL} onUserAdded={fetchUsers} />
                  </Box>
                </Stack>
              </Paper>
            </Grid.Col>

            {/* Tasks Column */}
            <Grid.Col span={{ base: 12, lg: 6 }}>
              <Paper withBorder shadow="md" radius="lg" p="xl" bg="white">
                <Stack gap="lg">
                  <Group justify="space-between">
                    <Group gap="xs">
                      <IconListDetails size={24} color="var(--mantine-color-green-6)" />
                      <Title order={3}>Tasks</Title>
                    </Group>
                    <Tooltip label="Refresh tasks">
                      <ActionIcon 
                        variant="light" 
                        size="lg" 
                        onClick={fetchTasks} 
                        loading={isFetchingTasks}
                        color="green"
                      >
                        <IconRefresh size={18} />
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                  
                  <ScrollArea h={400} type="hover" offsetScrollbars>
                    <TaskList tasks={tasks} onDelete={removeTask} />
                  </ScrollArea>
                  
                  <Box mt="md">
                    <AddTaskForm task_service_url={TASK_SERVICE_URL} onTaskAdded={fetchTasks} />
                  </Box>
                </Stack>
              </Paper>
            </Grid.Col>
          </Grid>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default App;
