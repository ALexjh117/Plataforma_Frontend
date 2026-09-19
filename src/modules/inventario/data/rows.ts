export type InventoryRow = {
  id: string
  name: string
  category: string
  stock: number
  status: 'Disponible' | 'Agotado'
}

export const INVENTORY_ROWS: InventoryRow[] = [
  { id: 'INV-001', name: 'Laptop HP', category: 'Tecnología', stock: 15, status: 'Disponible' },
  { id: 'INV-002', name: 'Rieles de 1x3 10cm', category: 'Tecnología', stock: 8, status: 'Disponible' },
  { id: 'INV-003', name: 'Herramienta manual', category: 'Herramientas', stock: 12, status: 'Disponible' },
  { id: 'INV-004', name: 'Café de especialidad', category: 'Alimentos', stock: 30, status: 'Disponible' },
  { id: 'INV-005', name: 'Guantes de seguridad', category: 'Dotación', stock: 20, status: 'Disponible' },
]
