export type ActivityRow = {
  id: string
  title: string
  date: string
  owner: string
  status: 'En curso' | 'Finalizada'
}

export const ACTIVITY_ROWS: ActivityRow[] = [
  { id: '1', title: 'Taller de mantenimiento preventivo', date: '2023-11-15', owner: 'Juan Pérez', status: 'En curso' },
  { id: '2', title: 'Revisión de inventario de equipos', date: '2023-11-10', owner: 'Ana García', status: 'Finalizada' },
  { id: '3', title: 'Capacitación en seguridad laboral', date: '2023-11-08', owner: 'Carlos Rodriguez', status: 'En curso' },
  { id: '4', title: 'Planificación trimestral de equipos', date: '2023-11-25', owner: 'Andres López', status: 'En curso' },
  { id: '5', title: 'Planificación trimestral de proyectos', date: '2023-10-25', owner: 'Sofia Torres', status: 'Finalizada' },
]
