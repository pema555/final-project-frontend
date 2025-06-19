import { Routes, Route } from 'react-router-dom'
import Home from '../layout/Home'
import Login from '../layout/Login'
import SingUp from '../layout/SignUp'
import ProtectedRoute from './ProtectedRoute'

const AppRoute = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/sign-up' element={<SingUp />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<Home />} />
        {/* Add more protected routes here */}
      </Route>
    </Routes>
  )
}

export default AppRoute