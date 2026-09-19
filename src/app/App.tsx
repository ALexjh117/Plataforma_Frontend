import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import type { ReactNode } from 'react'
import { AuthProvider } from '@/modules/auth/context/auth'
import RequireAdmin from '@/modules/auth/guards/RequireAdmin'
import RequireAuth from '@/modules/auth/guards/RequireAuth'
import RequireModule from '@/modules/auth/guards/RequireModule'
import LoginPage from '@/modules/auth/pages/LoginPage'
import RecoverPasswordPage from '@/modules/auth/pages/RecoverPasswordPage'
import ActivitiesPage from '@/modules/actividades/pages/ActivitiesPage'
import RolesPage from '@/modules/administracion/pages/RolesPage'
import UsersPage from '@/modules/administracion/pages/UsersPage'
import EnvironmentalPage from '@/modules/ambiental/pages/EnvironmentalPage'
import HomePage from '@/modules/inicio/pages/HomePage'
import InventoryPage from '@/modules/inventario/pages/InventoryPage'
import Dashboard from '@/modules/landing/pages/Dashboard'
import MaterialsPage from '@/modules/materiales/pages/MaterialsPage'
import ProfilePage from '@/modules/perfil/pages/ProfilePage'
import ReportsPage from '@/modules/reportes/pages/ReportsPage'

function Private({ children }: { children: ReactNode }) {
  return <RequireAuth>{children}</RequireAuth>
}

function ModuleRoute({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <RequireModule>{children}</RequireModule>
    </RequireAuth>
  )
}

function AdminRoute({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <RequireAdmin>{children}</RequireAdmin>
    </RequireAuth>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* landing: página pública */}
          <Route path="/" element={<Dashboard />} />

          {/* auth: login y recuperar */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/recuperar" element={<RecoverPasswordPage />} />

          {/* inicio: home interno */}
          <Route path="/inicio" element={<Private><HomePage /></Private>} />

          {/* módulos de negocio: cada uno vive en src/modules/<nombre> */}
          <Route path="/inventario" element={<ModuleRoute><InventoryPage /></ModuleRoute>} />
          <Route path="/materiales" element={<ModuleRoute><MaterialsPage /></ModuleRoute>} />
          <Route path="/ambiental" element={<ModuleRoute><EnvironmentalPage /></ModuleRoute>} />
          <Route path="/actividades" element={<ModuleRoute><ActivitiesPage /></ModuleRoute>} />
          <Route path="/reportes" element={<ModuleRoute><ReportsPage /></ModuleRoute>} />

          {/* perfil: ficha de la persona logueada */}
          <Route path="/perfil" element={<Private><ProfilePage /></Private>} />

          {/* administracion: solo Administrador */}
          <Route
            path="/usuarios"
            element={
              <AdminRoute>
                <UsersPage />
              </AdminRoute>
            }
          />
          <Route
            path="/perfiles"
            element={
              <AdminRoute>
                <RolesPage />
              </AdminRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
