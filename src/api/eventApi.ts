import axios from 'axios'

import api from '../lib/api'
import type {
  EventPayload,
  GetEventsResponse,
  UpdateEventResponse,
  GetEventsParams,
  EventType,
} from '../types'

export const getEvents = async (
  params: GetEventsParams = {}
): Promise<GetEventsResponse> => {
  try {
    const { data } = await api.get<GetEventsResponse>('/events', { params })
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Fetching events failed'
    }
    throw error
  }
}

export const createEvent = async (
  payload: EventPayload
): Promise<{ data: EventType }> => {
  try {
    const { data } = await api.post('/events', payload)
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Event creation failed'
    }
    throw error
  }
}

export const updateEvent = async (
  id: string,
  payload: EventPayload
): Promise<UpdateEventResponse> => {
  try {
    const { data } = await api.put<UpdateEventResponse>(
      `/events/${id}`,
      payload
    )
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Updating event failed'
    }
    throw error
  }
}

export const deleteEvent = async (id: string): Promise<{ message: string }> => {
  try {
    const { data } = await api.delete<{ message: string }>(`/events/${id}`)
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Deleting event failed'
    }
    throw error
  }
}
