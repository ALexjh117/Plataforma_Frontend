-- Pruebas de inventario. Abrir en pgAdmin (File -> Open), base Plataforma.
-- Cada bloque dice QUE debe salir. Si sale otra cosa, la relacion esta mal.

-- ---------------------------------------------------------------------------
-- PRUEBA 1. Inventario NO es una tabla de datos.
-- Debe listar: regional, c_formacion, perfil, modulo, modulo_perfil, usuario,
--              bodega, stand, categoria, subcategoria, elemento, item
-- NO debe aparecer una tabla llamada inventario.
-- ---------------------------------------------------------------------------
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE'
ORDER BY table_name;


-- ---------------------------------------------------------------------------
-- PRUEBA 2. El modulo Inventario vive en la tabla modulo (el menu).
-- Debe salir 1 fila: nombre Inventario.
-- ---------------------------------------------------------------------------
SELECT id_modulo, nombre, id_modulo_padre, estado
FROM public.modulo
WHERE nombre = 'Inventario';


-- ---------------------------------------------------------------------------
-- PRUEBA 3. categoria NO tiene id_modulo ni id_stand.
-- Debe listar SOLO: id_categoria, id_cformacion, nombre, estado.
-- Si aparece id_modulo o id_stand, esta mal.
-- ---------------------------------------------------------------------------
SELECT column_name
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'categoria'
ORDER BY ordinal_position;


-- ---------------------------------------------------------------------------
-- PRUEBA 4. item NO tiene stand ni categoria. Solo cuelga del elemento.
-- Debe listar SOLO: id_item, id_elemento, numero_serial, estado.
-- ---------------------------------------------------------------------------
SELECT column_name
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'item'
ORDER BY ordinal_position;


-- ---------------------------------------------------------------------------
-- PRUEBA 5. elemento es el core: tiene subcategoria (que es) y stand (donde).
-- Debe listar: id_elemento, id_subcategoria, id_stand, nombre, cantidad, estado.
-- ---------------------------------------------------------------------------
SELECT column_name
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'elemento'
ORDER BY ordinal_position;


-- ---------------------------------------------------------------------------
-- PRUEBA 6. Lo que ve el usuario en Productos (cada fila = un elemento).
-- Deben salir 2 filas, en cualquier orden:
--
-- Destornillador Phillips #2 | Herramientas | Manuales | Estante B-12 | Bodega Norte  | 8 | 0 seriales
-- Extintor PQS 10 lb         | Seguridad    | Contra incendio | Estante S-02 | Bodega Taller | 3 | 3 seriales
--
-- Si Destornillador sale con categoria distinta, o el 8 aparece como item, esta mal.
-- Si Pinturas cuelga del stand (misma categoria para todo el estante), esta mal.
-- ---------------------------------------------------------------------------
SELECT
    e.nombre AS elemento,
    c.nombre AS categoria,
    s.nombre AS subcategoria,
    st.nombre AS stand,
    b.nombre AS bodega,
    e.cantidad,
    (SELECT count(*) FROM public.item i WHERE i.id_elemento = e.id_elemento) AS seriales
FROM public.elemento e
JOIN public.subcategoria s ON s.id_subcategoria = e.id_subcategoria
JOIN public.categoria c ON c.id_categoria = s.id_categoria
JOIN public.stand st ON st.id_stand = e.id_stand
JOIN public.bodega b ON b.id_bodega = st.id_bodega
ORDER BY e.nombre;


-- ---------------------------------------------------------------------------
-- PRUEBA 7. El destornillador NO tiene items. El 8 es cantidad, no serial.
-- Debe salir 0 filas.
-- ---------------------------------------------------------------------------
SELECT i.numero_serial
FROM public.item i
JOIN public.elemento e ON e.id_elemento = i.id_elemento
WHERE e.nombre = 'Destornillador Phillips #2';


-- ---------------------------------------------------------------------------
-- PRUEBA 8. El extintor SI tiene 3 seriales. Cuelgan del elemento, no del stand.
-- Deben salir exactamente: EXT-019, EXT-020, EXT-021.
-- ---------------------------------------------------------------------------
SELECT i.numero_serial
FROM public.item i
JOIN public.elemento e ON e.id_elemento = i.id_elemento
WHERE e.nombre = 'Extintor PQS 10 lb'
ORDER BY i.numero_serial;


-- ---------------------------------------------------------------------------
-- PRUEBA 9. Dos categorias distintas pueden estar en stands distintos
--           (la categoria no vive en el stand).
-- Herramientas -> Bodega Norte / Estante B-12
-- Seguridad    -> Bodega Taller / Estante S-02
-- Si las dos categorias apuntaran al mismo stand "porque el stand tiene categoria",
-- el modelo estaria al reves.
-- ---------------------------------------------------------------------------
SELECT c.nombre AS categoria, st.nombre AS stand, b.nombre AS bodega
FROM public.elemento e
JOIN public.subcategoria s ON s.id_subcategoria = e.id_subcategoria
JOIN public.categoria c ON c.id_categoria = s.id_categoria
JOIN public.stand st ON st.id_stand = e.id_stand
JOIN public.bodega b ON b.id_bodega = st.id_bodega
ORDER BY c.nombre;


-- ---------------------------------------------------------------------------
-- PRUEBA 10. bodega y categoria usan el MISMO centro que el usuario (c_formacion).
-- No inventamos otra forma de centro. Deben coincidir los id_cformacion.
-- ---------------------------------------------------------------------------
SELECT
    e.nombre AS elemento,
    b.id_cformacion AS centro_bodega,
    c.id_cformacion AS centro_categoria,
    CASE
        WHEN b.id_cformacion = c.id_cformacion THEN 'OK mismo centro'
        ELSE 'MAL centros distintos'
    END AS chequeo
FROM public.elemento e
JOIN public.subcategoria s ON s.id_subcategoria = e.id_subcategoria
JOIN public.categoria c ON c.id_categoria = s.id_categoria
JOIN public.stand st ON st.id_stand = e.id_stand
JOIN public.bodega b ON b.id_bodega = st.id_bodega;


-- ---------------------------------------------------------------------------
-- PRUEBA 11. El permiso NO esta en categoria. Esta en usuario -> perfil -> modulo.
-- Debe salir quien tiene el modulo Inventario.
-- Si esta consulta necesita tocar categoria, el permiso estaria mal metido.
-- ---------------------------------------------------------------------------
SELECT
    u.nombres,
    u.apellidos,
    p.nombre AS perfil,
    m.nombre AS modulo
FROM public.usuario u
JOIN public.perfil p ON p.id_perfil = u.id_perfil
JOIN public.modulo_perfil mp ON mp.id_perfil = p.id_perfil AND mp.estado = true
JOIN public.modulo m ON m.id_modulo = mp.id_modulo
WHERE m.nombre = 'Inventario'
ORDER BY u.nombres;


-- ---------------------------------------------------------------------------
-- PRUEBA 12. Esta debe FALLAR (error: columna no existe).
-- Si CORRE y trae datos, le pusieron id_modulo a categoria. Eso no va.
-- Seleccionen SOLO este bloque y ejecutenlo aparte.
-- ---------------------------------------------------------------------------
-- SELECT id_modulo FROM public.categoria;
