import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

import { login, register, fetchMe } from '../api/authApi'
import type {
  LoginType,
  RegisterType,

  RegisterResponse,
  UserResponse,
} from '../types'

type AuthState = {
  user: UserResponse | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean

  loginUser: (credentials: LoginType) => Promise<void>
  registerUser: (payload: RegisterType) => Promise<void>
  logout: () => void
  fetchCurrentUser: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,

      loginUser: async (credentials) => {
        set({ loading: true })
        try {
          set({
            token: (await login(credentials)).token,
            isAuthenticated: true,
          })
          await get().fetchCurrentUser()
          toast.success('Logged in successfully')
        } catch (err) {
          const error = err as AxiosError<{ message?: string }>
          toast.error(error.response?.data?.message || 'Login failed')
          set({ token: null, isAuthenticated: false })
        } finally {
          set({ loading: false })
        }
      },

      registerUser: async (payload) => {
        set({ loading: true })
        try {
          const res: RegisterResponse = await register(payload)
          set({
            user: res.data,
            token: res.token,
            isAuthenticated: true,
          })
          toast.success('Registered and logged in successfully')
        } catch (err) {
          const error = err as AxiosError<{ message?: string }>
          toast.error(error.response?.data?.message || 'Registration failed')
          set({ token: null, isAuthenticated: false })
        } finally {
          set({ loading: false })
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
        toast.info('Logged out')
      },

      fetchCurrentUser: async () => {
        try {
          const user = await fetchMe()
          set({ user, isAuthenticated: true })
        } catch (err) {
          const error = err as AxiosError<{ message?: string }>
          toast.error(error.response?.data?.message || 'Session expired')
          set({
            user: null,
            isAuthenticated: false,
            token: null,
          })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
