export const APP_NAV = [
  { id: 'inicio', label: 'Inicio', to: '/inicio', icon: 'home' },
  { id: 'inventario', label: 'Inventario', to: '/inventario', icon: 'inventory' },
  { id: 'materiales', label: 'Material de Formación', to: '/materiales', icon: 'report' },
  { id: 'ambiental', label: 'Ambiental', to: '/ambiental', icon: 'leaf' },
  { id: 'actividades', label: 'Actividades', to: '/actividades', icon: 'calendar' },
  { id: 'reportes', label: 'Reportes', to: '/reportes', icon: 'report' },
  { id: 'usuarios', label: 'Usuarios', to: '/perfil', icon: 'user' },
  { id: 'configuracion', label: 'Configuración', icon: 'settings' },
] as const

export type NavIconName = (typeof APP_NAV)[number]['icon']
export type NavItemId = (typeof APP_NAV)[number]['id']
