import Button from './Button'
import LogoSena from './LogoSena'

type HeaderItem = {
  label: string
  href: string
  active?: boolean
}

const navigation: HeaderItem[] = [
  { label: 'Inicio', href: '#inicio', active: true },
  { label: 'Oferta de formación', href: '#oferta' },
  { label: 'Sedes', href: '#sedes' },
  { label: 'Noticias', href: '#noticias' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Header() {
  return (
    <header className="site-header">
      <a className="site-header__brand" href="#inicio" aria-label="SENA, inicio">
        <LogoSena compact />
      </a>

      <nav className="site-header__nav" aria-label="Navegación principal">
        {navigation.map(({ href, label, active }) => (
          <a
            key={label}
            href={href}
            className={active ? 'site-header__nav-item site-header__nav-item--active' : 'site-header__nav-item'}
          >
            {label}
          </a>
        ))}
      </nav>

      <Button variant="header" icon={<span aria-hidden="true">◉</span>} className="site-header__login-button">
        Iniciar sesión
      </Button>
    </header>
  )
}
