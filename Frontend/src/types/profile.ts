export type UserProfile = {
  fullName: string
  roleLabel: string
  location: string
  avatarUrl: string
  documentId: string
  email: string
  phone: string
  trainingCenter: string
  groupCode: string
  role: string
}

export type ProfileFieldName = Exclude<
  keyof UserProfile,
  'fullName' | 'roleLabel' | 'location' | 'avatarUrl'
>
