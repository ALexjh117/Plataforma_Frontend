import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import SenaMark from '../components/icons/SenaMark'
import { UserIcon } from '../components/icons/AppIcons'

export default function RecoverPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
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
        className="relative w-full max-w-md rounded-3xl border border-white/20 bg-sena-dark/55 px-8 py-10 text-white backdrop-blur-md"
      >
        <div className="flex flex-col items-center text-center">
          <SenaMark className="h-14 w-14 text-white" />
          <h1 className="mt-4 text-2xl font-semibold">Recuperar contraseña</h1>
          <p className="mt-2 max-w-sm text-sm text-white/75">
            Ingresa tu correo institucional. El endpoint de recuperación lo implementa el equipo de
            autenticación; aquí queda el flujo de la vista.
          </p>
        </div>

        <label className="mt-8 block text-sm font-medium text-white/85" htmlFor="email">
          Correo institucional
        </label>
        <div className="mt-1.5 flex h-11 items-center gap-2 rounded-full bg-white px-4 text-sena-text">
          <UserIcon className="size-4 shrink-0 text-sena-dark/55" />
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Ingresa tu correo institucional"
            className="h-full w-full bg-transparent text-sm outline-none placeholder:text-sena-text/40"
          />
        </div>

        {sent ? (
          <p role="status" className="mt-4 rounded-lg bg-white/10 px-3 py-2 text-sm text-white/90">
            Vista lista. Falta `POST /api/v1/auth/recover` en el backend (ver guía de endpoints).
          </p>
        ) : null}

        <button
          type="submit"
          className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-sena text-sm font-semibold text-white transition hover:bg-[#009247]"
        >
          Enviar enlace
          <span aria-hidden="true">→</span>
        </button>

        <p className="mt-4 text-center text-sm">
          <Link to="/login" className="text-white/80 underline-offset-2 hover:underline">
            ← Volver al inicio de sesión
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
