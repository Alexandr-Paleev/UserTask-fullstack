import React from 'react';
import { Card, Avatar, Text, Badge, ActionIcon, Stack, Group, Tooltip, Box } from '@mantine/core';
import { IconMapPin, IconPhone, IconBuildingCommunity, IconUser, IconTrash } from '@tabler/icons-react';
import { modals } from '@mantine/modals';

const UserList = ({ users, onDelete }) => {
  const handleDeleteClick = (user) => {
    modals.openConfirmModal({
      title: 'Delete user',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete <b>{user.firstname} {user.lastname}</b>?
          This action will also delete all tasks assigned to this user and cannot be undone.
        </Text>
      ),
      labels: { confirm: 'Delete user', cancel: 'No, keep it' },
      confirmProps: { color: 'red' },
      onConfirm: () => onDelete(user.id),
    });
  };

  if (!users || users.length === 0) {
    return (
      <Box py="xl">
        <Stack align="center" gap="xs">
          <IconUser size={48} stroke={1.5} style={{ opacity: 0.2 }} />
          <Text c="dimmed">No users found.</Text>
        </Stack>
      </Box>
    );
  }

  return (
    <Stack gap="md">
      {users.map((user) => (
        <Card key={user.id} withBorder padding="md" radius="md" shadow="sm" className="group">
          <Group wrap="nowrap" align="flex-start">
            <Avatar 
              size="lg" 
              radius="xl" 
              variant="gradient" 
              gradient={{ from: 'blue', to: 'indigo' }}
            >
              {user.firstname.charAt(0)}{user.lastname.charAt(0)}
            </Avatar>

            <Box style={{ flex: 1 }}>
              <Group justify="space-between" mb="xs">
                <Text size="lg" fw={700}>
                  {user.firstname} {user.lastname}
                </Text>
                <Group gap="xs">
                  <Badge variant="light" color="gray">
                    ID: {user.id}
                  </Badge>
                  {onDelete && (
                    <Tooltip label="Delete User">
                      <ActionIcon 
                        variant="subtle" 
                        color="red" 
                        onClick={() => handleDeleteClick(user)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <IconTrash size={18} />
                      </ActionIcon>
                    </Tooltip>
                  )}
                </Group>
              </Group>

              <Group gap="xl" mt="sm">
                <Group gap={5}>
                  <IconMapPin size={16} stroke={1.5} color="var(--mantine-color-dimmed)" />
                  <Text size="sm" c="dimmed">
                    {user.address}
                  </Text>
                </Group>
                <Group gap={5}>
                  <IconPhone size={16} stroke={1.5} color="var(--mantine-color-dimmed)" />
                  <Text size="sm" c="dimmed">
                    {user.phone}
                  </Text>
                </Group>
              </Group>

              {user.city && (
                <Group gap={5} mt="xs">
                  <IconBuildingCommunity size={16} stroke={1.5} color="var(--mantine-color-indigo-6)" />
                  <Text size="sm" fw={500} c="indigo">
                    {user.city.title}
                  </Text>
                </Group>
              )}
            </Box>
          </Group>
        </Card>
      ))}
    </Stack>
  );
};

export default UserList;
