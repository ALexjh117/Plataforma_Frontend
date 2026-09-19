-- Atributos del Excel del cliente en elemento.
-- File -> Open en pgAdmin, base Plataforma. No recrea tablas.

SET client_encoding = 'UTF8';

BEGIN;

ALTER TABLE public.elemento
    ADD COLUMN IF NOT EXISTS codigo character varying(50);

ALTER TABLE public.elemento
    ADD COLUMN IF NOT EXISTS descripcion_tecnica text;

ALTER TABLE public.elemento
    ADD COLUMN IF NOT EXISTS marca character varying(80);

ALTER TABLE public.elemento
    ADD COLUMN IF NOT EXISTS url_fotografia character varying(500);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'uq_elemento_codigo'
    ) THEN
        ALTER TABLE ONLY public.elemento
            ADD CONSTRAINT uq_elemento_codigo UNIQUE (codigo);
    END IF;
END $$;

INSERT INTO public.unidad_medida (nombre, abreviatura)
VALUES
    ('1/4 galon', '1/4 gal'),
    ('Poma', 'poma')
ON CONFLICT (nombre) DO NOTHING;

-- Ejemplo: el destornillador queda como en un Excel real (sin foto todavia).
UPDATE public.elemento
SET
    codigo = 'DEST-PH2',
    descripcion_tecnica = 'Destornillador punta Phillips #2, uso manual.',
    marca = NULL,
    url_fotografia = NULL
WHERE nombre = 'Destornillador Phillips #2'
  AND codigo IS NULL;

UPDATE public.elemento
SET
    codigo = 'EXT-PQS-10',
    descripcion_tecnica = 'Extintor PQS 10 lb, recargable.',
    marca = NULL,
    url_fotografia = NULL
WHERE nombre = 'Extintor PQS 10 lb'
  AND codigo IS NULL;

COMMIT;

SELECT
    e.codigo,
    e.nombre,
    e.descripcion_tecnica,
    e.marca,
    e.url_fotografia,
    e.cantidad,
    u.abreviatura AS unidad
FROM public.elemento e
JOIN public.unidad_medida u ON u.id_unidad_medida = e.id_unidad_medida
ORDER BY e.nombre;
