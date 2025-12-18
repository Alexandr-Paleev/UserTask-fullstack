import axios from 'axios'
import type { AxiosInstance } from 'axios'

const API_URL: string = process.env.REACT_APP_API_URL || 'http://localhost:5001'

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
})


