import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { notifications } from '@mantine/notifications';
import { TextInput, Select, Button, Title, Stack, Group, Paper } from '@mantine/core';
import { IconUserPlus } from '@tabler/icons-react';

const schema = z.object({
  firstname: z.string().min(1, "Firstname is required"),
  lastname: z.string().min(1, "Lastname is required"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(1, "Phone is required"),
  cityId: z.string().min(1, "City is required"),
});

const AddUserForm = ({ user_service_url, onUserAdded }) => {
  const [cities, setCities] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    initialValues: {
      firstname: '',
      lastname: '',
      address: '',
      phone: '',
      cityId: '',
    },
    validate: zodResolver(schema),
  });

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
    const cityUrl = `${API_URL}/city`; 
    axios.get(cityUrl)
      .then(response => setCities(response.data))
      .catch(error => console.error("Error fetching cities:", error));
  }, []);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    const payload = {
      ...values,
      city: { id: parseInt(values.cityId, 10) }
    };
    
    try {
      await axios.post(user_service_url, payload);
      notifications.show({
        title: 'Success',
        message: 'User added successfully!',
        color: 'green',
      });
      form.reset();
      if (onUserAdded) onUserAdded();
    } catch (e) {
      console.error(e);
      notifications.show({
        title: 'Error',
        message: e.response?.data || 'Failed to add user',
        color: 'red',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const cityOptions = cities.map(city => ({
    value: city.id.toString(),
    label: city.title
  }));

  return (
    <Paper withBorder p="md" radius="md" bg="var(--mantine-color-gray-0)">
      <form onSubmit={form.onSubmit(handleSubmit)}>
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
              {...form.getInputProps('firstname')}
            />
            <TextInput
              label="Lastname"
              placeholder="Doe"
              required
              {...form.getInputProps('lastname')}
            />
          </Group>

          <TextInput
            label="Address"
            placeholder="123 Main St"
            required
            {...form.getInputProps('address')}
          />

          <Group grow>
            <TextInput
              label="Phone"
              placeholder="555-0123"
              required
              {...form.getInputProps('phone')}
            />
            <Select
              label="City"
              placeholder="Select a city"
              data={cityOptions}
              required
              searchable
              {...form.getInputProps('cityId')}
            />
          </Group>

          <Button 
            type="submit" 
            loading={isSubmitting}
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
  );
};

export default AddUserForm;
