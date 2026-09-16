import { senaLogo } from '../assets/images'

type LogoSenaProps = {
  className?: string
  compact?: boolean
}

export default function LogoSena({ className = '', compact = false }: LogoSenaProps) {
  return (
    <div className={`sena-logo ${compact ? 'sena-logo--compact' : ''} ${className}`.trim()} aria-label="SENA">
      <img src={senaLogo} alt="SENA" className="sena-logo__mark" />
    </div>
  )
}
