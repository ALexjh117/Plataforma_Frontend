# Inventario

Ruta: `/inventario`

Aquí va **todo** lo de inventario: pantallas, modales, tablas de elementos, bodegas, stands, categorías. Si alguien entra a tocar inventario, entra a esta carpeta.

- `pages/` — pantallas (hoy `InventoryPage`)
- `components/` — piezas solo de inventario (formulario de elemento, selector de bodega, etc.)
- `data/` — datos de prueba mientras no esté el API

No pongas esto en `shared`. El menú y el permiso viven en el backend (`modulo` Inventario); el código de la pantalla vive aquí.
