import axios from 'axios'
import { useAuthStore } from '../store/useAuthStore'

const baseURL = import.meta.env.VITE_API_BASE_URL


const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Safe token accessor
const getAuthToken = () => {
  try {
    return useAuthStore.getState().token
  } catch (err) {
    console.error('[Auth] Failed to get token:', err)
    return null
  }
}

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    try {
      const token = getAuthToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch (err) {
      console.error('[Axios] Request interceptor error:', err)
    }
    return config
  },
  (error) => {
    console.error('[Axios] Request interceptor rejection:', error)
    return Promise.reject(error)
  }
)

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    try {
      const originalRequest = error.config
      const { logout } = useAuthStore.getState()

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        // Optional: implement refresh token logic here

        console.warn('[Axios] Unauthorized. Logging out...')
        logout()
      }
    } catch (err) {
      console.error('[Axios] Response interceptor error:', err)
    }

    return Promise.reject(error)
  }
)

export default api
