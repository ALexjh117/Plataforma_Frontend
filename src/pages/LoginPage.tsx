import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import SenaMark from '../components/icons/SenaMark'
import { ApiError } from '../lib/api'
import { useAuth } from '../lib/auth'
import { EyeIcon, EyeOffIcon, LockIcon, UserIcon } from '../components/icons/AppIcons'

export default function LoginPage() {
  const { token, isReady, login } = useAuth()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/inicio'
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (isReady && token) {
    return <Navigate to={from} replace />
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      await login({ usuario, password })
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : 'No se pudo iniciar sesión.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="app-shell relative flex min-h-svh items-center justify-center overflow-hidden bg-sena-forest px-4 py-10"
      style={{
        backgroundImage: "url('/img/imageninicio.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-sena-forest/70" />

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md rounded-3xl border border-white/20 bg-sena-dark/55 px-8 py-10 text-white shadow-none backdrop-blur-md"
      >
        <div className="flex flex-col items-center text-center">
          <SenaMark className="h-14 w-14 text-white" />
          <h1 className="mt-4 text-2xl font-semibold">Iniciar sesión</h1>
          <p className="mt-1 text-sm text-white/75">Accede a tu cuenta para continuar</p>
        </div>

        <label className="mt-8 block text-sm font-medium text-white/85" htmlFor="usuario">
          Usuario o documento
        </label>
        <div className="mt-1.5 flex h-11 items-center gap-2 rounded-full bg-white px-4 text-sena-text">
          <UserIcon className="size-4 shrink-0 text-sena-dark/55" />
          <input
            id="usuario"
            name="usuario"
            autoComplete="username"
            required
            value={usuario}
            onChange={(event) => setUsuario(event.target.value)}
            placeholder="Ingresa tu usuario o documento"
            className="h-full w-full bg-transparent text-sm outline-none placeholder:text-sena-text/40"
          />
        </div>

        <label className="mt-4 block text-sm font-medium text-white/85" htmlFor="password">
          Contraseña
        </label>
        <div className="mt-1.5 flex h-11 items-center gap-2 rounded-full bg-white px-4 text-sena-text">
          <LockIcon className="size-4 shrink-0 text-sena-dark/55" />
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Ingresa tu contraseña"
            className="h-full w-full bg-transparent text-sm outline-none placeholder:text-sena-text/40"
          />
          <button
            type="button"
            className="text-sena-dark/55 hover:text-sena-dark"
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            onClick={() => setShowPassword((current) => !current)}
          >
            {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
          </button>
        </div>

        <label className="mt-4 flex items-center gap-2 text-sm text-white/80">
          <input
            type="checkbox"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
            className="size-4 accent-sena"
          />
          Recordar sesión
        </label>

        {error ? (
          <p role="alert" className="mt-4 rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-100">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-sena text-sm font-semibold text-white transition hover:bg-[#009247] disabled:opacity-60"
        >
          {isSubmitting ? 'Ingresando…' : 'Ingresar'}
          <span aria-hidden="true">→</span>
        </button>

        <p className="mt-4 text-center text-sm">
          <Link to="/recuperar" className="text-white/80 underline-offset-2 hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </p>

        <div className="mt-8 border-t border-white/20 pt-5 text-center">
          <p className="text-sm font-semibold tracking-wide">SENA</p>
          <p className="mt-1 text-xs text-white/65">Servicio Nacional de Aprendizaje</p>
        </div>
      </form>
    </div>
  )
}
