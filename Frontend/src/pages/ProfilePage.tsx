import { useEffect, useState, type FormEvent } from 'react'
import AppLayout from '../components/layout/AppLayout'
import PersonalInfoForm from '../components/profile/PersonalInfoForm'
import ProfileIdentityCard from '../components/profile/ProfileIdentityCard'
import { mockProfile } from '../data/mockProfile'
import type { ProfileFieldName, UserProfile } from '../types/profile'

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(mockProfile)
  const [draft, setDraft] = useState<UserProfile>(mockProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Mi perfil | SENA'
    return () => {
      document.title = previousTitle
    }
  }, [])

  useEffect(() => {
    if (!isEditing) return
    document.getElementById('documentId')?.focus()
  }, [isEditing])

  const handleEdit = () => {
    setDraft(profile)
    setSaveMessage(null)
    setIsEditing(true)
  }

  const handleCancel = () => {
    setDraft(profile)
    setIsEditing(false)
  }

  const handleChange = (name: ProfileFieldName, value: string) => {
    setDraft((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setProfile(draft)
    setIsEditing(false)
    setSaveMessage('Cambios guardados correctamente.')
  }

  return (
    <AppLayout title="Mi perfil">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold tracking-tight text-sena-text">Mi perfil</h1>

        <div className="mt-6">
          <ProfileIdentityCard
            profile={profile}
            isEditing={isEditing}
            onEdit={handleEdit}
            onCancel={handleCancel}
          />
          <PersonalInfoForm
            value={isEditing ? draft : profile}
            isEditing={isEditing}
            saveMessage={saveMessage}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </AppLayout>
  )
}
