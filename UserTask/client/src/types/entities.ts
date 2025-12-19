export type City = {
  id: number
  title: string
}

export type User = {
  id: number
  firstname: string
  lastname: string
  address: string
  phone: string
  city?: City
}

export type Task = {
  id: number
  title: string
  description: string
  address: string
  startTime: string
  endTime: string
  user?: User
}

export type CreateUserPayload = {
  firstname: string
  lastname: string
  address: string
  phone: string
  city: { id: number }
}

export type CreateTaskPayload = {
  title: string
  description: string
  address: string
  startTime: string
  endTime: string
  user: { id: number }
}
