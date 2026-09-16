import type { FormEvent } from 'react'
import type { ProfileFieldName, UserProfile } from '../../types/profile'
import Button from '../ui/Button'
import TextField from '../ui/TextField'

type FieldConfig = {
  name: ProfileFieldName
  label: string
  type: 'text' | 'email' | 'tel'
  autoComplete?: string
}

const FIELDS: FieldConfig[] = [
  { name: 'documentId', label: 'Documento', type: 'text', autoComplete: 'off' },
  { name: 'email', label: 'Correo electrónico', type: 'email', autoComplete: 'email' },
  { name: 'phone', label: 'Teléfono', type: 'tel', autoComplete: 'tel' },
  { name: 'trainingCenter', label: 'Centro de formación', type: 'text' },
  { name: 'groupCode', label: 'Ficha', type: 'text' },
  { name: 'role', label: 'Rol', type: 'text' },
]

type PersonalInfoFormProps = {
  value: UserProfile
  isEditing: boolean
  saveMessage: string | null
  onChange: (name: ProfileFieldName, value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export default function PersonalInfoForm({
  value,
  isEditing,
  saveMessage,
  onChange,
  onSubmit,
}: PersonalInfoFormProps) {
  return (
    <form onSubmit={onSubmit} className="mt-8">
      <h3 className="text-lg font-semibold text-sena-text">Información personal</h3>

      {saveMessage ? (
        <p
          role="status"
          className="mt-3 rounded-lg bg-sena/10 px-3 py-2 text-sm font-medium text-sena-dark"
        >
          {saveMessage}
        </p>
      ) : null}

      <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
        {FIELDS.map((field) => (
          <TextField
            key={field.name}
            id={field.name}
            name={field.name}
            label={field.label}
            type={field.type}
            autoComplete={field.autoComplete}
            value={value[field.name]}
            readOnly={!isEditing}
            required={isEditing}
            onChange={(event) => onChange(field.name, event.target.value)}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <Button type="submit" disabled={!isEditing}>
          Guardar
        </Button>
      </div>
    </form>
  )
}
