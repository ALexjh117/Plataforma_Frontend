import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import RequireAdmin from './components/auth/RequireAdmin'
import RequireAuth from './components/auth/RequireAuth'
import { AuthProvider } from './lib/auth'
import ActivitiesPage from './pages/ActivitiesPage'
import Dashboard from './pages/Dashboard'
import EnvironmentalPage from './pages/EnvironmentalPage'
import HomePage from './pages/HomePage'
import InventoryPage from './pages/InventoryPage'
import MaterialsPage from './pages/MaterialsPage'
import ProfilePage from './pages/ProfilePage'
import ReportsPage from './pages/ReportsPage'
import RolesPage from './pages/RolesPage'
import type { ReactNode } from 'react'

function Private({ children }: { children: ReactNode }) {
  return <RequireAuth>{children}</RequireAuth>
}

/** Hueco de la tarea de autenticación. Reemplaza esto con LoginPage / RecoverPasswordPage. */
function AuthPending({ page }: { page: 'LoginPage.tsx' | 'RecoverPasswordPage.tsx' }) {
  return (
    <div className="grid min-h-svh place-items-center bg-sena-forest px-6 text-center text-white">
      <p className="max-w-md text-sm text-white/80">
        Vista pendiente: crea <code className="text-white">src/pages/{page}</code> y
        conéctala aquí. Guía: <code className="text-white">docs/tarea-login-y-recuperar.md</code>
      </p>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<AuthPending page="LoginPage.tsx" />} />
          <Route path="/recuperar" element={<AuthPending page="RecoverPasswordPage.tsx" />} />
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
