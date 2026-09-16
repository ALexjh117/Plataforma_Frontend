import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { MenuIcon } from '../icons/AppIcons'
import SenaMark from '../icons/SenaMark'
import Sidebar from './Sidebar'

type AppLayoutProps = {
  title: string
  children: ReactNode
}

export default function AppLayout({ title, children }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), [])

  useEffect(() => {
    if (!isSidebarOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeSidebar()
    }

    const onResize = () => {
      if (window.innerWidth >= 768) closeSidebar()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [isSidebarOpen, closeSidebar])

  return (
    <div className="app-shell bg-white">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sena-dark"
      >
        Saltar al contenido
      </a>

      {isSidebarOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-sena-forest/40 md:hidden"
          aria-label="Cerrar menú"
          onClick={closeSidebar}
        />
      ) : null}

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <div className="md:pl-60">
        <header className="flex items-center gap-3 bg-sena-dark px-4 py-3 text-white md:hidden">
          <button
            type="button"
            className="rounded-md p-1.5 hover:bg-white/10"
            aria-label="Abrir menú"
            aria-expanded={isSidebarOpen}
            aria-controls="navegacion-principal"
            onClick={() => setIsSidebarOpen(true)}
          >
            <MenuIcon className="size-6" />
          </button>
          <SenaMark className="h-8 w-8" />
          <span className="text-sm font-semibold">{title}</span>
        </header>

        <main id="contenido" className="min-h-svh px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  )
}
