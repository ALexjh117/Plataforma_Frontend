export type UserProfile = {
  id: number
  fullName: string
  roleLabel: string
  location: string
  avatarUrl: string
  documentType: string
  documentId: string
  email: string
  phone: string
  address: string
  trainingCenter: string
  groupCode: string
  role: string
  initials: string
}

export type ProfileDraft = Pick<UserProfile, 'documentId' | 'email' | 'phone' | 'address'>

export type AppModule = {
  id: number
  code: string
  label: string
  description: string
  to: string | null
  icon: string
  parentId: number | null
  order: number
}

export type ModuleNode = {
  id: number
  code: string
  label: string
  description: string
  to: string | null
  icon: string
  parentId: number | null
  granted: boolean
  children: ModuleNode[]
}

export type Role = {
  id: number
  name: string
  description: string
  active: boolean
}

export type RoleDetail = Role & {
  moduleIds: number[]
  tree: ModuleNode[]
}
