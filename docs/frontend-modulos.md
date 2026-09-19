# Mapa del frontend (carpetas)

La guía para el equipo —qué necesitas, dónde está el login, cómo enrutar, no instalar libs sin aviso— está en el **[README](../README.md)**. Este archivo es el mapa corto.

## Dónde va cada cosa

| Qué vas a tocar | Carpeta | URL |
| --- | --- | --- |
| Login / recuperar / sesión | `src/modules/auth/` | `/login`, `/recuperar` |
| Landing pública | `src/modules/landing/` | `/` |
| Home interno | `src/modules/inicio/` | `/inicio` |
| Inventario | `src/modules/inventario/` | `/inventario` |
| Material de formación | `src/modules/materiales/` | `/materiales` |
| Gestión ambiental | `src/modules/ambiental/` | `/ambiental` |
| Actividades | `src/modules/actividades/` | `/actividades` |
| Reportes | `src/modules/reportes/` | `/reportes` |
| Usuarios y roles | `src/modules/administracion/` | `/usuarios`, `/perfiles` |
| Ficha de la persona | `src/modules/perfil/` | `/perfil` |
| Botón, modal, sidebar, API | `src/shared/` | — |
| Estilos globales / colores | `src/index.css` | — |
| Nueva URL | `src/app/App.tsx` | — |

## Receta de un módulo

```
src/modules/<nombre>/
  pages/         pantallas
  components/    piezas solo de este módulo
  data/          datos de prueba
```

Regla: si solo lo usa inventario, va en inventario. `shared` no es un cajón.

## Enrutar (copiar de inventario)

En `src/app/App.tsx`:

```tsx
import InventoryPage from '@/modules/inventario/pages/InventoryPage'

<Route path="/inventario" element={<ModuleRoute><InventoryPage /></ModuleRoute>} />
```

- Pública: sin envoltorio (`/`, `/login`).
- Logueado: `<Private>`.
- Logueado + permiso del módulo: `<ModuleRoute>`.
- Solo admin: `<AdminRoute>`.

## Módulo nuevo

1. Crea `src/modules/<nombre>/pages/` (y `components/` si hace falta).
2. Registra la ruta en `src/app/App.tsx`.
3. El permiso sigue viniendo de la tabla `modulo` del backend.

No crees `src/pages/` ni `src/components/` sueltos.
