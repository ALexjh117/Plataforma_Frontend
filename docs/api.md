# Frontend ↔ API

El proxy de Vite manda `/api` a `http://localhost:3333`.

1. En `Plataformaback/Backend`: `npm run dev` (puerto 3333).
2. En este repo: `npm run dev`.
3. **Iniciar sesión** en `/login` (la vista la arma quien tenga la tarea de autenticación; el API ya es `POST /api/v1/auth/login`).
   - Correo: `carlos@correo.com` (o documento `1001001001`)
   - Contraseña: `123456`
   - Receta: `docs/tarea-login-y-recuperar.md`

Vista de perfil: `/perfil` (requiere token). Editar guarda con `PATCH /api/v1/account/profile`. Cambiar contraseña usa `PATCH /api/v1/account/password`.

Cómo armar otros endpoints (paso a paso para quien no ha hecho backend): `Plataformaback/docs/guia-para-el-equipo.md`.

Vistas ya montadas en el frontend (tras login van a `/inicio`):

- `/inicio` inicio autenticado
- `/inventario` `/materiales` `/ambiental` `/actividades` `/reportes`
- `/perfil` conectado al API
- `/perfiles` (solo Administrador): crear roles tipo Aprendiz y asignar módulos padre/hijo/nieto

