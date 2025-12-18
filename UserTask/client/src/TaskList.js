import React from 'react';
import { Card, Text, Badge, ActionIcon, Stack, Group, Tooltip, Box, Divider } from '@mantine/core';
import { IconMapPin, IconClock, IconUser, IconCalendar, IconTrash } from '@tabler/icons-react';
import { modals } from '@mantine/modals';

const TaskList = ({ tasks, onDelete }) => {
  const handleDeleteClick = (task) => {
    modals.openConfirmModal({
      title: 'Delete task',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete task <b>"{task.title}"</b>?
          This action cannot be undone.
        </Text>
      ),
      labels: { confirm: 'Delete task', cancel: 'No, keep it' },
      confirmProps: { color: 'red' },
      onConfirm: () => onDelete(task.id),
    });
  };

  if (!tasks || tasks.length === 0) {
    return (
      <Box py="xl">
        <Stack align="center" gap="xs">
          <IconCalendar size={48} stroke={1.5} style={{ opacity: 0.2 }} />
          <Text c="dimmed">No tasks found.</Text>
        </Stack>
      </Box>
    );
  }

  return (
    <Stack gap="md">
      {tasks.map((task) => (
        <Card 
          key={task.id} 
          withBorder 
          padding="md" 
          radius="md" 
          shadow="sm" 
          className="group"
          style={{ borderLeft: '4px solid var(--mantine-color-green-6)' }}
        >
          <Group justify="space-between" align="flex-start" wrap="nowrap">
            <Box style={{ flex: 1 }}>
              <Text size="lg" fw={700} mb={4}>
                {task.title}
              </Text>
              <Text size="sm" c="dimmed" mb="md" style={{ lineHeight: 1.5 }}>
                {task.description}
              </Text>
              
              <Group gap="xs">
                <Badge variant="light" color="gray" leftSection={<IconMapPin size={12} />}>
                  {task.address}
                </Badge>
                
                {(task.startTime || task.endTime) && (
                  <Badge variant="light" color="blue" leftSection={<IconClock size={12} />}>
                    {task.startTime} - {task.endTime}
                  </Badge>
                )}
              </Group>

              {task.user && (
                <>
                  <Divider my="sm" variant="dotted" />
                  <Group gap={8}>
                    <IconUser size={14} color="var(--mantine-color-dimmed)" />
                    <Text size="xs" c="dimmed">Assigned to:</Text>
                    <Text size="xs" fw={700} c="indigo">
                      {task.user.firstname} {task.user.lastname}
                    </Text>
                  </Group>
                </>
              )}
            </Box>
            
            <Tooltip label="Delete Task">
              <ActionIcon 
                variant="subtle" 
                color="red" 
                onClick={() => handleDeleteClick(task)}
                className="group-hover-target"
              >
                <IconTrash size={18} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Card>
      ))}
    </Stack>
  );
};

export default TaskList;
