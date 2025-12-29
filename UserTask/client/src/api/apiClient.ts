import axios from 'axios'
import type { AxiosInstance } from 'axios'

import { env } from '../env'

const API_URL: string = env.VITE_API_URL
const AUTH_TOKEN_KEY = 'auth_token'

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY)
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    if (status === 401) {
      // Token expired/invalid: clear and notify app
      localStorage.removeItem(AUTH_TOKEN_KEY)
      window.dispatchEvent(new Event('auth:logout'))
    }
    return Promise.reject(error)
  },
)
