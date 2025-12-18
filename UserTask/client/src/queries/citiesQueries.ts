import { useQuery } from '@tanstack/react-query'
import { getCities } from '../api/citiesApi'
import { cityKeys } from '../api/queryKeys'
import type { City } from '../types/entities'

export function useCitiesQuery() {
  return useQuery<City[]>({
    queryKey: cityKeys.lists(),
    queryFn: getCities,
  })
}


