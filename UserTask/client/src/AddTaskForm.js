import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { notifications } from '@mantine/notifications';
import { TextInput, Textarea, Select, Button, Title, Stack, Group, Paper } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  address: z.string().min(1, "Address is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  userId: z.string().min(1, "User is required"),
});

const AddTaskForm = ({ task_service_url, onTaskAdded }) => {
  const [users, setUsers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      address: '',
      startTime: '',
      endTime: '',
      userId: '',
    },
    validate: zodResolver(schema),
  });

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
    const userUrl = `${API_URL}/user`;
    axios.get(userUrl)
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    const payload = {
      ...values,
      user: { id: parseInt(values.userId, 10) }
    };
    
    try {
      await axios.post(task_service_url, payload);
      notifications.show({
        title: 'Success',
        message: 'Task added successfully!',
        color: 'green',
      });
      form.reset();
      if (onTaskAdded) onTaskAdded();
    } catch (e) {
      console.error(e);
      notifications.show({
        title: 'Error',
        message: e.response?.data || 'Failed to add task',
        color: 'red',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const userOptions = users.map(user => ({
    value: user.id.toString(),
    label: `${user.firstname} ${user.lastname}`
  }));

  return (
    <Paper withBorder p="md" radius="md" bg="var(--mantine-color-gray-0)">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group mb="md">
          <IconPlus size={20} color="var(--mantine-color-green-6)" />
          <Title order={4}>New Task</Title>
        </Group>
        
        <Stack gap="sm">
          <TextInput
            label="Title"
            placeholder="e.g. Weekly Meeting"
            required
            {...form.getInputProps('title')}
          />

          <Textarea
            label="Description"
            placeholder="Task details..."
            required
            rows={2}
            {...form.getInputProps('description')}
          />

          <TextInput
            label="Address"
            placeholder="Office Room 302"
            required
            {...form.getInputProps('address')}
          />

          <Group grow>
            <TextInput
              type="time"
              label="Start Time"
              required
              {...form.getInputProps('startTime')}
            />
            <TextInput
              type="time"
              label="End Time"
              required
              {...form.getInputProps('endTime')}
            />
          </Group>

          <Select
            label="Assign to User"
            placeholder="Select a user"
            data={userOptions}
            required
            searchable
            {...form.getInputProps('userId')}
          />

          <Button 
            type="submit" 
            loading={isSubmitting}
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
  );
};

export default AddTaskForm;
