export const APP_NAV = [
  { id: 'inicio', label: 'Inicio', to: '/', icon: 'home' },
  { id: 'inventario', label: 'Inventario', icon: 'inventory' },
  { id: 'ambiental', label: 'Ambiental', icon: 'leaf' },
  { id: 'actividades', label: 'Actividades', icon: 'calendar' },
  { id: 'reportes', label: 'Reportes', icon: 'report' },
  { id: 'usuarios', label: 'Usuarios', to: '/perfil', icon: 'user' },
  { id: 'configuracion', label: 'Configuración', icon: 'settings' },
] as const

export type NavIconName = (typeof APP_NAV)[number]['icon']
export type NavItemId = (typeof APP_NAV)[number]['id']
 