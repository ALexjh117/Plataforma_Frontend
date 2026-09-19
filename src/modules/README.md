# Módulos

¿Qué necesitas? La guía está en el [README](../../README.md) (login, landing, home, cómo enrutar, no instalar libs sin aviso).

Cada carpeta es un módulo. Entras a la que te tocó y trabajas ahí.

| Carpeta | Ruta | Qué es |
| --- | --- | --- |
| `auth/` | `/login`, `/recuperar` | Entrar, salir, recuperar, guards de sesión |
| `inventario/` | `/inventario` | Elementos, bodegas, stands, categorías |
| `materiales/` | `/materiales` | Material de formación |
| `ambiental/` | `/ambiental` | Gestión ambiental |
| `actividades/` | `/actividades` | Actividades del centro |
| `reportes/` | `/reportes` | Informes |
| `administracion/` | `/usuarios`, `/perfiles` | Usuarios y roles (solo admin) |
| `perfil/` | `/perfil` | Ficha de la persona logueada |
| `inicio/` | `/inicio` | Home interno |
| `landing/` | `/` | Página pública |

¿Te tocó una app nueva? Crea otra carpeta aquí, con `pages/` y `components/`, y registra la URL en `src/app/App.tsx`.

Cómo enrutar, probar y no instalar libs: [README](../../README.md).
