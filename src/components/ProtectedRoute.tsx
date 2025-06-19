import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { useEffect } from 'react'

const ProtectedRoute = () => {
  const {  token, fetchCurrentUser } = useAuthStore()

  useEffect(() => {
    if (token ) {
      fetchCurrentUser()
    }
  }, [token, fetchCurrentUser])

  if (!token) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}

export default ProtectedRoute