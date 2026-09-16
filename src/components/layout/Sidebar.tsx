import { Link, NavLink } from 'react-router-dom'
import { APP_NAV } from '../../constants/navigation'
import { cn } from '../../lib/cn'
import { CloseIcon, LogoutIcon, NavIcon } from '../icons/AppIcons'
import SenaMark from '../icons/SenaMark'

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}

const itemClass =
  'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition duration-150'

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside
      id="navegacion-principal"
      className={cn(
        'fixed inset-y-0 left-0 z-40 flex w-60 flex-col overflow-y-auto bg-sena-dark text-white shadow-xl',
        'transition-transform duration-200 ease-out',
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      )}
      aria-label="Módulos del sistema"
    >
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white"
          aria-label="SENA, inicio"
          onClick={onClose}
        >
          <SenaMark className="h-10 w-10" />
          <span className="text-lg font-semibold tracking-tight">SENA</span>
        </Link>
        <button
          type="button"
          className="rounded-md p-1 text-white/80 hover:bg-white/10 md:hidden"
          onClick={onClose}
          aria-label="Cerrar menú"
        >
          <CloseIcon className="size-5" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 pt-2">
        {APP_NAV.map((item) => {
          const icon = <NavIcon name={item.icon} className="size-[1.15rem] shrink-0" />

          if (!('to' in item) || !item.to) {
            return (
              <span
                key={item.id}
                title="Módulo en construcción"
                className={cn(itemClass, 'cursor-default text-white/80')}
              >
                {icon}
                {item.label}
              </span>
            )
          }

          return (
            <NavLink
              key={item.id}
              to={item.to}
              end
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  itemClass,
                  isActive ? 'bg-white/15 text-white shadow-sm' : 'text-white/85 hover:bg-white/10 hover:text-white',
                )
              }
            >
              {icon}
              {item.label}
            </NavLink>
          )
        })}
      </nav>

      <div className="px-3 pb-5">
        <Link
          to="/"
          onClick={onClose}
          className={cn(itemClass, 'text-white/80 hover:bg-white/10 hover:text-white')}
        >
          <LogoutIcon className="size-[1.15rem] shrink-0" />
          Cerrar sesión
        </Link>
      </div>
    </aside>
  )
}
