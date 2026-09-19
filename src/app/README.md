# App

Aquí viven las **rutas**. Si creas una pantalla nueva, la importas y la registras en `App.tsx`.

No pongas componentes de negocio aquí. Cómo enrutar y cómo probar un módulo: [README](../../README.md).

```tsx
import InventoryPage from '@/modules/inventario/pages/InventoryPage'

<Route path="/inventario" element={<ModuleRoute><InventoryPage /></ModuleRoute>} />
```
