export type MaterialRow = {
  id: string
  name: string
  category: string
  stock: number
  status: 'Disponible' | 'Agotado'
}

export const MATERIAL_ROWS: MaterialRow[] = [
  { id: 'MAT-001', name: 'Guía de aprendizaje', category: 'Documentos', stock: 40, status: 'Disponible' },
  { id: 'MAT-002', name: 'Kit de prácticas', category: 'Talleres', stock: 18, status: 'Disponible' },
  { id: 'MAT-003', name: 'Manual de seguridad', category: 'Documentos', stock: 22, status: 'Disponible' },
]
