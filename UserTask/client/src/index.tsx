import React, { useEffect, useState } from 'react'
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function Root() {
  const [Devtools, setDevtools] = useState<React.ComponentType<{ initialIsOpen?: boolean }> | null>(
    null,
  )

  useEffect(() => {
    if (!import.meta.env.DEV) return

    let mounted = true
    import('@tanstack/react-query-devtools').then((m) => {
      if (!mounted) return
      setDevtools(() => m.ReactQueryDevtools)
    })
    return () => {
      mounted = false
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider defaultColorScheme="light">
        <Notifications position="top-right" />
        <ModalsProvider>
          <App />
        </ModalsProvider>
      </MantineProvider>
      {Devtools ? <Devtools initialIsOpen={false} /> : null}
    </QueryClientProvider>
  )
}

const container = document.getElementById('root')
if (!container) {
  throw new Error('Root element (#root) not found')
}

const root = createRoot(container)
root.render(<Root />)

serviceWorker.unregister()
