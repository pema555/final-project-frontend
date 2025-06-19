import { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Button } from './ui/button'

const Header = () => {
  const { user, logout, fetchCurrentUser } = useAuthStore()

  useEffect(() => {
    fetchCurrentUser()
  }, [fetchCurrentUser])

  return (
    <header className='flex flex-col w-full mt-10 p-6'>
      {/* Top Row with Logout Button aligned right */}
      <div className='flex justify-end'>
        <Button onClick={logout} variant='destructive'>
          Logout
        </Button>
      </div>

      {/* Centered Content */}
      <section className='flex flex-col items-center text-center mt-4'>
        <h1 className='text-2xl font-semibold text-gray-800'>
          Welcome to the Event Management Platform
        </h1>
        <p className='text-xl font-bold text-gray-700 mt-2'>
          Logged in as <span className='text-blue-600'>{user?.name}</span> with
          role <span className='text-blue-600'>{user?.role}</span>
        </p>
      </section>
    </header>
  )
}

export default Header
