import { UserRole } from '../lib/utils'

declare type RegisterType = {
  name: string
  email: string
  password: string
  role: UserRole
}
export type UserResponse = {
  data: UserResponse | null | undefined
  token: string | null | undefined
  _id: string
  name: string
  email: string
  role: UserRole
}
export type RegisterResponse = {
  data: UserType
  token: string
}

declare type HearerProps = {
  user: {
    email: string
  }
}

declare type LoginType = {
  email: string
  password: string
}

export type LoginResponse = {
  message: string
  token: string
}

export type GetEventsParams = {
  title?: string
  date?: string
  location?: string
  sort?: string
  page?: string
  limit?: string
}

export type EventPayload = {
  title: string
  description: string
  date: string // ISO string
  location: string
}

export type EventType = {
  _id: string
  title: string
  description: string
  date: string
  location: string
  userId: string
  createdAt: string
  updatedAt: string
  __v: number
}
export type CreateEventResponse = {
  data: EventType
  message: string
}
export type MetaType = {
  total: number
  page: number
  limit: number
  totalPages: number
}
export type GetEventsResponse = {
  data: EventType[]
  meta: MetaType
}

export type UpdateEventResponse = {
  message: string
  data: EventType
}

export type EventUpdateType = {
  eventId: string
  title?: string
  description?: string
  date?: Date | string
  location?: string
}

export type EventFormValues = {
  date: string
  description: string
  location: string
  title: string
  _id?: string
}
