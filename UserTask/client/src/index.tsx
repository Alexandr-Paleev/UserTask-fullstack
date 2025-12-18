import React from 'react'
import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dates/styles.css'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

const ReactQueryDevtools =
  process.env.NODE_ENV === 'development'
    ? // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('@tanstack/react-query-devtools').ReactQueryDevtools
    : null

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

const container = document.getElementById('root')
if (!container) {
  throw new Error('Root element (#root) not found')
}

const root = createRoot(container)
root.render(
  <QueryClientProvider client={queryClient}>
    <MantineProvider defaultColorScheme="light">
      <Notifications />
      <ModalsProvider>
        <App />
      </ModalsProvider>
    </MantineProvider>
    {ReactQueryDevtools ? <ReactQueryDevtools initialIsOpen={false} /> : null}
  </QueryClientProvider>
)

serviceWorker.unregister()


