import api from '../lib/api'
import axios from 'axios'
import type {
  LoginType,
  RegisterType,
  RegisterResponse,
  UserResponse,
} from '../types'

/** Registers a new user */
export const register = async (
  payload: RegisterType
): Promise<RegisterResponse> => {
  try {
    const { data } = await api.post<RegisterResponse>('/auth/register', payload)
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Register error:', error.response?.data)
      throw new Error(error.response?.data?.message || 'Registration failed')
    }
    console.error('Unexpected register error:', error)
    throw new Error('Registration failed')
  }
}

/** Logs in a user */
export const login = async (payload: LoginType): Promise<UserResponse> => {
  try {
    const { data } = await api.post<UserResponse>('/auth/login', payload)
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Login error:', error.response?.data)
      throw new Error(error.response?.data?.message || 'Login failed. Please try again.')
    }
    console.error('Unexpected login error:', error)
    throw new Error('Login failed')
  }
}

/** Fetches currently authenticated user */
export const fetchMe = async (): Promise<UserResponse> => {
  try {
    const { data } = await api.get<UserResponse>('/auth/me')
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Fetch user error:', error.response?.data)
      throw new Error(error.response?.data?.message || 'Failed to fetch user data')
    }
    console.error('Unexpected fetchMe error:', error)
    throw new Error('Failed to fetch user data')
  }
}
