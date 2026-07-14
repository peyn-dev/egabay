import { Navigate, Route, Routes } from 'react-router'

import DashboardPage from '@/pages/dashboard'
import LoginPage from '@/pages/login'
import StudentPage from '@/pages/student'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/student" element={<StudentPage />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
