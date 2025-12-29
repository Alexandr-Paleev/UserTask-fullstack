import { render, screen } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import TaskList from '../TaskList'
import { describe, it, expect } from 'vitest'
import type { Task } from '../types/entities'

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: any) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => { }, // Deprecated
        removeListener: () => { }, // Deprecated
        addEventListener: () => { },
        removeEventListener: () => { },
        dispatchEvent: () => false,
    }),
})

const renderWithProviders = (ui: React.ReactNode) => {
    return render(
        <MantineProvider>
            <ModalsProvider>{ui}</ModalsProvider>
        </MantineProvider>
    )
}

describe('TaskList', () => {
    it('renders "No tasks found" when list is empty', () => {
        renderWithProviders(<TaskList tasks={[]} />)
        expect(screen.getByText('No tasks found.')).toBeInTheDocument()
    })

    it('renders tasks when provided', () => {
        const tasks: Task[] = [
            {
                id: 1,
                title: 'Test Task',
                description: 'Test Description',
                address: 'Test Address',
                startTime: '10:00',
                endTime: '11:00',
                user: {
                    id: 1,
                    firstname: 'John',
                    lastname: 'Doe',
                    address: 'Addr',
                    phone: '123'
                }
            } as Task
        ]
        renderWithProviders(<TaskList tasks={tasks} />)
        expect(screen.getByText('Test Task')).toBeInTheDocument()
        expect(screen.getByText('Test Description')).toBeInTheDocument()
    })
})
