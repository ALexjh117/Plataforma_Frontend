import type { UserProfile } from '../../types/profile'
import { PencilIcon } from '../icons/AppIcons'
import Button from '../ui/Button'

type ProfileIdentityCardProps = {
  profile: UserProfile
  isEditing: boolean
  onEdit: () => void
  onCancel: () => void
}

export default function ProfileIdentityCard({
  profile,
  isEditing,
  onEdit,
  onCancel,
}: ProfileIdentityCardProps) {
  return (
    <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <img
          src={profile.avatarUrl}
          alt={`Foto de ${profile.fullName}`}
          width={80}
          height={80}
          decoding="async"
          className="size-20 shrink-0 rounded-full object-cover ring-4 ring-sena-muted"
        />
        <div className="min-w-0">
          <h2 className="text-xl font-semibold tracking-tight text-sena-text">{profile.fullName}</h2>
          <p className="mt-0.5 text-sm font-medium text-sena-text/70">{profile.roleLabel}</p>
          <p className="mt-1 text-sm break-words text-sena-text/55">{profile.location}</p>
        </div>
      </div>

      <div className="shrink-0 self-start sm:self-center">
        {isEditing ? (
          <Button variant="secondary" size="sm" onClick={onCancel}>
            Cancelar
          </Button>
        ) : (
          <Button size="sm" icon={<PencilIcon className="size-4" />} onClick={onEdit}>
            Editar
          </Button>
        )}
      </div>
    </section>
  )
}
