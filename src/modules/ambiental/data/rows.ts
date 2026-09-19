export type WasteRow = {
  id: string
  date: string
  type: string
  quantity: string
  status: 'Reutilizable' | 'No reutilizable'
}

export const WASTE_ROWS: WasteRow[] = [
  { id: '1', date: '2025-06-10', type: 'Plástico', quantity: '15 kg', status: 'Reutilizable' },
  { id: '2', date: '2025-06-09', type: 'Orgánico', quantity: '8 kg', status: 'Reutilizable' },
  { id: '3', date: '2025-06-08', type: 'Reciclable', quantity: '5 kg', status: 'Reutilizable' },
  { id: '4', date: '2025-06-07', type: 'Peligroso', quantity: '3 kg', status: 'No reutilizable' },
  { id: '5', date: '2025-06-06', type: 'Metálico', quantity: '10 kg', status: 'Reutilizable' },
]
