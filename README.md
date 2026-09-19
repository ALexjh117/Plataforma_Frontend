# Plataforma SENA — frontend

Tranquil@, ya todo esta ordenado. No hay que adivinar carpetas ni inventar una estructura nueva.

Si acabas de clonar el repo, la pregunta no es “¿por dónde empiezo a crear folders?”. La pregunta es: **¿qué necesitas, developer?** Busca tu caso abajo, entra a esa carpeta y trabaja **solo ahí**.

```bash
nvm use          # Node 24.21.0 (la misma del backend)
npm ci           # la primera vez
npm run dev      # http://localhost:5173
```

Con `npm run dev` debe verse **lo que ya estaba**:

| URL | Qué sale |
| --- | --- |
| `/` | Landing pública del SENA (hero, oferta, mapa) |
| `/login` | Iniciar sesión |
| `/inicio` | Home interno (después de entrar) |
| `/inventario` | Módulo inventario (con sesión y permiso) |

Cuentas de prueba, clave `123456`: `carlos@correo.com` (admin), `juan@correo.com`, `maria@correo.com`. El API tiene que estar en `http://localhost:3333` para que el login entre.

---

## ¿Qué necesitas?

| Estoy buscando… | Ve aquí |
| --- | --- |
| El **login** o recuperar contraseña | `src/modules/auth/` |
| El **home** interno (después de login) | `src/modules/inicio/` |
| El **landing** (página pública `/`) | `src/modules/landing/` |
| **Inventario** | `src/modules/inventario/` |
| Materiales / ambiental / actividades / reportes | `src/modules/<ese-nombre>/` |
| Usuarios y perfiles (roles) | `src/modules/administracion/` |
| Mi perfil (ficha de la persona) | `src/modules/perfil/` |
| Un **botón, modal, input**, sidebar | `src/shared/components/` |
| **Estilos** (colores SENA, Tailwind) | `src/index.css` + clases en el JSX |
| **Rutas** (URLs, enrutar una pantalla) | `src/app/App.tsx` |
| Llamadas al API | `src/shared/lib/api.ts` |
| Imágenes de la landing | `public/img/` |

Guía corta del mapa: [`docs/frontend-modulos.md`](docs/frontend-modulos.md). Node: [`docs/node.md`](docs/node.md).

---

## Reglas del equipo (léelas)

1. **Trabaja en un solo módulo.** Si te tocó inventario, no toques login ni el landing. Si te tocó el login, no reorganices `shared`.
2. **No instales librerías sin aviso.** Ni `npm install axios`, ni icon packs, ni UI kits, ni “esta lib que vi en TikTok”. Si hace falta algo, se habla con el grupo **antes**. El `package.json` es de todos.
3. **No crees `src/pages/` ni `src/components/` sueltos.** Esas carpetas se quitaron a propósito. La pantalla nueva va en `src/modules/<módulo>/pages/`.
4. **`shared` no es un cajón.** Ahí solo va lo que usan **dos o más** módulos. Un modal de “nuevo elemento” es de inventario, no de shared.
5. **No cambies Node** ni subas de major. Front y back usan **24.21.0**. Detalle: [`docs/node.md`](docs/node.md).

---

## Mapa de carpetas

```
src/
  app/App.tsx              ← las URLs. Aquí se enruta. No va lógica de negocio.
  index.css                ← colores SENA y Tailwind (estilos globales)
  main.tsx                 ← arranque. Casi nunca se toca.
  assets/                  ← imágenes que Vite empaqueta
  shared/                  ← piezas comunes (Button, layout, api)
  modules/
    auth/                  ← login, sesión, “¿puede entrar?”
    landing/               ← página pública /
    inicio/                ← home interno /inicio
    inventario/            ← todo inventario
    materiales/
    ambiental/
    actividades/
    reportes/
    administracion/        ← usuarios y roles
    perfil/                ← ficha de quien inició sesión
```

Dentro de **cada** módulo el orden es siempre el mismo:

```
src/modules/inventario/
  pages/         pantallas (una URL = un archivo)
  components/    piezas que SOLO usa este módulo
  data/          datos de prueba mientras no esté el API
```

Alias: `@/` = `src/`. Ejemplo:

```tsx
import Button from '@/shared/components/ui/Button'
import InventoryPage from '@/modules/inventario/pages/InventoryPage'
```

---

## Dónde está cada cosa (con archivo)

### Login

- Pantalla: `src/modules/auth/pages/LoginPage.tsx` → URL `/login`
- Recuperar: `src/modules/auth/pages/RecoverPasswordPage.tsx` → `/recuperar`
- Sesión: `src/modules/auth/context/auth.tsx` (`useAuth`, `login`, `logout`)
- “¿Ya entró?”: `src/modules/auth/guards/RequireAuth.tsx`
- “¿Es admin?”: `src/modules/auth/guards/RequireAdmin.tsx`
- “¿Este perfil puede este módulo?”: `src/modules/auth/guards/RequireModule.tsx`

### Landing vs home (no son lo mismo)

| | Landing | Home |
| --- | --- | --- |
| URL | `/` | `/inicio` |
| Carpeta | `src/modules/landing/` | `src/modules/inicio/` |
| Quién la ve | Cualquiera, sin login | Quien ya inició sesión |
| Qué es | Página del SENA (hero, programas, mapa) | Tablero interno con los módulos del perfil |

Si te pidieron “el inicio público”, es **landing**. Si te pidieron “el home de la plataforma”, es **inicio**.

### Inventario (ejemplo de módulo de negocio)

- Pantalla: `src/modules/inventario/pages/InventoryPage.tsx` → `/inventario`
- Componentes propios: `src/modules/inventario/components/`
- Datos de prueba: `src/modules/inventario/data/rows.ts`

Un formulario de elemento, un selector de bodega, una tabla de stands: **aquí**, no en `shared`.

### Estilos

No hay una carpeta `styles/` por módulo. Se usa **Tailwind** en el JSX.

- Colores del SENA (`sena`, `sena-dark`, `sena-muted`…): `src/index.css` (`@theme`)
- Clases en el componente: `className="rounded-xl bg-sena text-white"`
- Imágenes estáticas: `public/img/` (se llaman `/img/imageninicio.jpg`)

Si el color no existe, **no instales una lib de temas**. Agrégalo en `src/index.css` (y avisa al grupo si es un color nuevo de marca).

```css
/* src/index.css — ya están estos. No inventes nombres paralelos. */
@theme {
  --color-sena: #00a651;
  --color-sena-dark: #004623;
  --color-sena-muted: #f4f6fb;
}
```

```tsx
<button className="h-11 rounded-xl bg-sena px-4 font-semibold text-white">
  Guardar
</button>
```

Botón, input y modal ya existen. Reúsalos:

```tsx
import Button from '@/shared/components/ui/Button'
import TextField from '@/shared/components/ui/TextField'
import Modal from '@/shared/components/ui/Modal'
```

---

## Cómo trabajar solo en un módulo

Ejemplo: te tocó **inventario**.

1. Abre `src/modules/inventario/`.
2. La pantalla está en `pages/InventoryPage.tsx`.
3. Un componente nuevo (modal, formulario) va en `components/`.
4. Para verlo: `npm run dev` → entra con una cuenta → ve a `/inventario`.
5. No muevas archivos de `auth/` ni del landing “para dejarlo más bonito”.

Mismo patrón para materiales, ambiental, etc.: **entras a esa carpeta y te quedas ahí**.

---

## Cómo enrutar (y cómo probar una pantalla)

Las URLs viven **solo** en `src/app/App.tsx`. Crear el archivo no basta: hay que colgarlo en una `<Route>`.

Hay tres envoltorios:

| Envoltorio | Cuándo |
| --- | --- |
| Nada | Pública (landing, login) |
| `<Private>` | Hay que estar logueado (home, perfil) |
| `<ModuleRoute>` | Logueado **y** el perfil tiene ese módulo |
| `<AdminRoute>` | Solo Administrador (usuarios, roles) |

### Colgar una pantalla que ya existe (inventario)

Esto **ya está**. No lo dupliques. Es el modelo a copiar:

```tsx
import InventoryPage from '@/modules/inventario/pages/InventoryPage'

<Route
  path="/inventario"
  element={
    <ModuleRoute>
      <InventoryPage />
    </ModuleRoute>
  }
/>
```

### Agregar un componente y verlo en esa pantalla

1. Créalo en el módulo, no en shared:

```tsx
// src/modules/inventario/components/ElementoForm.tsx
import Button from '@/shared/components/ui/Button'
import TextField from '@/shared/components/ui/TextField'

export default function ElementoForm() {
  return (
    <form className="space-y-4">
      <TextField id="nombre" label="Nombre" />
      <Button type="submit">Guardar</Button>
    </form>
  )
}
```

2. Úsalo en la página del **mismo** módulo:

```tsx
// src/modules/inventario/pages/InventoryPage.tsx
import ElementoForm from '../components/ElementoForm'

export default function InventoryPage() {
  return (
    <AppLayout title="Inventario">
      <ElementoForm />
    </AppLayout>
  )
}
```

3. Guarda. Vite recarga solo. Vas a `http://localhost:5173/inventario` (con sesión).

### Probar una pieza sin pelearte con el login (temporal)

Si estás armando el UI y quieres verlo ya, puedes colgarla **un rato** como ruta pública. **No lo dejes así en el merge**: inventario no es público.

```tsx
// src/app/App.tsx — SOLO mientras diseñas. Después vuelve a ModuleRoute.
import ElementoForm from '@/modules/inventario/components/ElementoForm'

<Route path="/probar-elemento" element={<ElementoForm />} />
```

Abres `http://localhost:5173/probar-elemento`. Cuando ya se vea bien, **borra esa ruta** y deja el componente dentro de `InventoryPage` con `ModuleRoute`.

### Módulo nuevo (una app que metamos después)

```tsx
// 1. src/modules/mi-app/pages/MiAppPage.tsx
export default function MiAppPage() {
  return <AppLayout title="Mi app">Hola</AppLayout>
}

// 2. En src/app/App.tsx
import MiAppPage from '@/modules/mi-app/pages/MiAppPage'

<Route
  path="/mi-app"
  element={
    <ModuleRoute>
      <MiAppPage />
    </ModuleRoute>
  }
/>
```

El menú no se dibuja a mano: sale de los módulos que el backend le asignó al perfil. Si la URL no está en la tabla `modulo`, `ModuleRoute` te manda a `/inicio`.

---

## Qué no hacer

```bash
# NO, sin hablarlo con el grupo
npm install axios
npm install bootstrap
npm install @mui/material
npm install styled-components
```

Ya hay `fetch` en `src/shared/lib/api.ts`. Ya hay botón, modal e input. Ya hay Tailwind. Si de verdad falta una lib, se propone, se acuerda, y **después** se instala.

---

## Requisitos

Este repo y el backend (`Plataformaback`) usan **la misma** versión de Node. [`docs/node.md`](docs/node.md).

```bash
nvm install 24.21.0
nvm use
node -v    # v24.21.0
npm -v     # 11.19.0
npm ci
npm run dev
```
