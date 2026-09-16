import { Link } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import { NavIcon } from '../components/icons/AppIcons'
import SenaMark from '../components/icons/SenaMark'
import { useAuth } from '../lib/auth'
import type { NavIconName } from '../constants/navigation'

const HOME_CARDS: Array<{
  label: string
  description: string
  to: string
  icon: NavIconName
}> = [
  {
    label: 'Inventario',
    description: 'Gestiona los materiales, bodegas y préstamos.',
    to: '/inventario',
    icon: 'inventory',
  },
  {
    label: 'Ambiental',
    description: 'Consulta y gestiona los procesos ambientales del centro.',
    to: '/ambiental',
    icon: 'leaf',
  },
  {
    label: 'Actividades',
    description: 'Revisa y administra las actividades del centro.',
    to: '/actividades',
    icon: 'calendar',
  },
  {
    label: 'Reportes',
    description: 'Visualiza estadísticas e informes del sistema.',
    to: '/reportes',
    icon: 'report',
  },
]

const QUICK_LINKS = [
  { label: 'Usuarios', to: '/perfil', icon: 'user' as const },
  { label: 'Centros de Formación', to: null, icon: 'inventory' as const },
  { label: 'Regiones', to: null, icon: 'leaf' as const },
  { label: 'Configuración', to: null, icon: 'settings' as const },
]

export default function HomePage() {
  const { user, isAdmin } = useAuth()
  const firstName = user?.fullName.split(' ')[0] ?? 'usuario'
  const quickLinks = isAdmin
    ? [{ label: 'Perfiles', to: '/perfiles', icon: 'user' as const }, ...QUICK_LINKS]
    : QUICK_LINKS

  return (
    <AppLayout title="Inicio">
      <p className="text-sm font-medium text-sena">Bienvenido</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight text-sena-text">
        ¡Bienvenido, {firstName}!
      </h1>
      <p className="mt-2 text-sm text-sena-text/60">{user?.location}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {HOME_CARDS.map((card) => (
          <article key={card.to} className="rounded-2xl bg-white p-5">
            <div className="grid size-12 place-items-center rounded-xl bg-sena/10 text-sena">
              <NavIcon name={card.icon} className="size-6" />
            </div>
            <h2 className="mt-4 text-base font-semibold text-sena-text">{card.label}</h2>
            <p className="mt-1 text-sm leading-5 text-sena-text/60">{card.description}</p>
            <Link to={card.to} className="mt-4 inline-flex items-center text-sm font-semibold text-sena">
              Ingresar →
            </Link>
          </article>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-semibold text-sena-text">Accesos rápidos</h2>
      <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_1.4fr]">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-2">
          {quickLinks.map((item) =>
            item.to ? (
              <Link
                key={item.label}
                to={item.to}
                className="flex flex-col items-center gap-2 rounded-2xl bg-white px-3 py-5 text-center"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-sena/10 text-sena">
                  <NavIcon name={item.icon} className="size-5" />
                </span>
                <span className="text-sm font-medium text-sena-text">{item.label}</span>
              </Link>
            ) : (
              <span
                key={item.label}
                className="flex flex-col items-center gap-2 rounded-2xl bg-white px-3 py-5 text-center text-sena-text/45"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-sena-muted text-sena-text/40">
                  <NavIcon name={item.icon} className="size-5" />
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </span>
            ),
          )}
        </div>
        <div className="overflow-hidden rounded-2xl bg-sena-dark text-white">
          <div className="grid h-full min-h-[180px] md:grid-cols-2">
            <img src="/img/programa-tecnologia.jpg" alt="" className="h-full min-h-[180px] w-full object-cover" />
            <div className="flex flex-col justify-center px-6 py-5">
              <SenaMark className="h-10 w-10 text-white" />
              <p className="mt-3 text-lg font-semibold leading-6">La formación también construye un mejor país</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
