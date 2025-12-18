export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
}

export const taskKeys = {
  all: ['tasks'] as const,
  lists: () => [...taskKeys.all, 'list'] as const,
}

export const cityKeys = {
  all: ['cities'] as const,
  lists: () => [...cityKeys.all, 'list'] as const,
}


