import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import RequireAdmin from './components/auth/RequireAdmin'
import RequireAuth from './components/auth/RequireAuth'
import { AuthProvider } from './lib/auth'
import ActivitiesPage from './pages/ActivitiesPage'
import Dashboard from './pages/Dashboard'
import EnvironmentalPage from './pages/EnvironmentalPage'
import HomePage from './pages/HomePage'
import InventoryPage from './pages/InventoryPage'
import LoginPage from './pages/LoginPage'
import MaterialsPage from './pages/MaterialsPage'
import ProfilePage from './pages/ProfilePage'
import RecoverPasswordPage from './pages/RecoverPasswordPage'
import ReportsPage from './pages/ReportsPage'
import RolesPage from './pages/RolesPage'
import type { ReactNode } from 'react'

function Private({ children }: { children: ReactNode }) {
  return <RequireAuth>{children}</RequireAuth>
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/recuperar" element={<RecoverPasswordPage />} />
          <Route path="/inicio" element={<Private><HomePage /></Private>} />
          <Route path="/inventario" element={<Private><InventoryPage /></Private>} />
          <Route path="/materiales" element={<Private><MaterialsPage /></Private>} />
          <Route path="/ambiental" element={<Private><EnvironmentalPage /></Private>} />
          <Route path="/actividades" element={<Private><ActivitiesPage /></Private>} />
          <Route path="/reportes" element={<Private><ReportsPage /></Private>} />
          <Route path="/perfil" element={<Private><ProfilePage /></Private>} />
          <Route
            path="/perfiles"
            element={
              <Private>
                <RequireAdmin>
                  <RolesPage />
                </RequireAdmin>
              </Private>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
