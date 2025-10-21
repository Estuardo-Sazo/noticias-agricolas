import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import LoginPage from '../modules/auth/pages/login'
import Profile from '../modules/users/pages/profile'
import { useAuth } from '../context/AuthContext'
import MainLayout from '../layouts/MainLayout'

export default function AppRouter() {
  function ProtectedLayout() {
    /* const { user } = useAuth()
    if (!user) return <Navigate to="/login" /> */
    return (
      <MainLayout>
        <Outlet />
      </MainLayout>
    )
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedLayout />}>
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
