-- Agregar unidad de medida. Abrir en pgAdmin (File -> Open), base Plataforma.
-- No recrea inventario. No toca usuario ni modulo.
-- elemento guarda id_unidad_medida. Muchos elementos pueden usar "Unidad" o "Litro".

SET client_encoding = 'UTF8';

BEGIN;

CREATE TABLE IF NOT EXISTS public.unidad_medida (
    id_unidad_medida integer NOT NULL,
    nombre character varying(80) NOT NULL,
    abreviatura character varying(20) NOT NULL,
    estado boolean DEFAULT true
);

CREATE SEQUENCE IF NOT EXISTS public.unidad_medida_id_unidad_medida_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.unidad_medida_id_unidad_medida_seq
    OWNED BY public.unidad_medida.id_unidad_medida;

ALTER TABLE ONLY public.unidad_medida
    ALTER COLUMN id_unidad_medida SET DEFAULT nextval('public.unidad_medida_id_unidad_medida_seq'::regclass);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'unidad_medida_pkey'
    ) THEN
        ALTER TABLE ONLY public.unidad_medida
            ADD CONSTRAINT unidad_medida_pkey PRIMARY KEY (id_unidad_medida);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'uq_unidad_medida_nombre'
    ) THEN
        ALTER TABLE ONLY public.unidad_medida
            ADD CONSTRAINT uq_unidad_medida_nombre UNIQUE (nombre);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'uq_unidad_medida_abreviatura'
    ) THEN
        ALTER TABLE ONLY public.unidad_medida
            ADD CONSTRAINT uq_unidad_medida_abreviatura UNIQUE (abreviatura);
    END IF;
END $$;

INSERT INTO public.unidad_medida (nombre, abreviatura)
VALUES
    ('Unidad', 'und'),
    ('Litro', 'L'),
    ('Kilogramo', 'kg'),
    ('Galon', 'gal'),
    ('Metro', 'm')
ON CONFLICT (nombre) DO NOTHING;

ALTER TABLE public.elemento
    ADD COLUMN IF NOT EXISTS id_unidad_medida integer;

UPDATE public.elemento
SET id_unidad_medida = (
    SELECT id_unidad_medida
    FROM public.unidad_medida
    WHERE nombre = 'Unidad'
)
WHERE id_unidad_medida IS NULL;

ALTER TABLE public.elemento
    ALTER COLUMN id_unidad_medida SET NOT NULL;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'fk_elemento_unidad_medida'
    ) THEN
        ALTER TABLE ONLY public.elemento
            ADD CONSTRAINT fk_elemento_unidad_medida
            FOREIGN KEY (id_unidad_medida) REFERENCES public.unidad_medida(id_unidad_medida)
            ON UPDATE CASCADE ON DELETE RESTRICT;
    END IF;
END $$;

COMMIT;

-- Prueba rapida: debe salir destornillador y extintor con unidad "und".
SELECT e.nombre, e.cantidad, u.nombre AS unidad, u.abreviatura
FROM public.elemento e
JOIN public.unidad_medida u ON u.id_unidad_medida = e.id_unidad_medida
ORDER BY e.nombre;
