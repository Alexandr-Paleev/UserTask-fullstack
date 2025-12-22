import { apiClient } from './apiClient'
import type { City } from '../types/entities'

export async function getCities(): Promise<City[]> {
  const res = await apiClient.get<City[]>('/city')
  return res.data
}



