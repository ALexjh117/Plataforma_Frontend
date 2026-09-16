import { Link } from 'react-router-dom'

const navigation = [
  { label: 'Inicio', href: '#inicio', active: true },
  { label: 'Oferta de formación', href: '#oferta' },
  { label: 'Sedes', href: '#sedes' },
  { label: 'Noticias', href: '#noticias' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Header() {
  return (
    <header className="relative z-30 flex h-[95px] items-center rounded-t-[20px] bg-[#005c3d] px-8 text-white lg:px-[66px]">
      <a
        href="#inicio"
        aria-label="SENA, inicio"
        className="flex w-[145px] shrink-0 items-center"
      >
        <img
          src="/img/logo-sena.svg"
          alt="SENA"
          className="h-[76px] w-auto object-contain"
        />
      </a>

      <nav className="ml-8 flex h-full flex-1 items-center justify-center gap-10">
        {navigation.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={[
              'relative flex h-full items-center whitespace-nowrap text-[17px] font-medium text-white',
              item.active
                ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[4px] after:rounded-t-full after:bg-[#ffb300]'
                : '',
            ].join(' ')}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <Link
        to="/perfil"
        className="flex h-[54px] shrink-0 items-center gap-3 rounded-full bg-[#0b925f] px-[26px] text-[17px] font-bold text-white shadow-sm transition hover:brightness-105"
      >
        <svg
          width="23"
          height="23"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="2"
          />

          <circle
            cx="12"
            cy="10"
            r="2.5"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M7.5 17C8.55 14.95 10.1 14 12 14C13.9 14 15.45 14.95 16.5 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <span>Iniciar sesión</span>
      </Link>
    </header>
  )
}