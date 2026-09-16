import { IMG } from '../constants/images'
import type { UserProfile } from '../types/profile'

export const mockProfile: UserProfile = {
  fullName: 'Carlos Pérez',
  roleLabel: 'Aprendiz SENA',
  location: 'Centro de Formación, Centro Agroindustrial — Regional Tolima',
  avatarUrl: IMG.profileAvatar,
  documentId: '1234567890',
  email: 'carlos.perez@sena.edu.co',
  phone: '3001234567',
  trainingCenter: 'Centro Agroindustrial',
  groupCode: '1234567',
  role: 'Aprendiz',
}
