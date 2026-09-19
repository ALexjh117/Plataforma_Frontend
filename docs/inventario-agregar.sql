-- Inventario: solo agregar. No toca usuario, perfil, modulo, c_formacion.
-- Pegar en pgAdmin, conectado a la base Plataforma. Se puede correr otra vez.

SET client_encoding = 'UTF8';

BEGIN;

DROP TABLE IF EXISTS public.item;
DROP TABLE IF EXISTS public.elemento;
DROP TABLE IF EXISTS public.subcategoria;
DROP TABLE IF EXISTS public.stand;
DROP TABLE IF EXISTS public.categoria;
DROP TABLE IF EXISTS public.bodega;
DROP TABLE IF EXISTS public.unidad_medida;

-- 1. bodega: lugar grande. Mismo centro que el usuario.
CREATE TABLE public.bodega (
    id_bodega integer NOT NULL,
    id_cformacion integer NOT NULL,
    nombre character varying(150) NOT NULL,
    estado boolean DEFAULT true
);

CREATE SEQUENCE IF NOT EXISTS public.bodega_id_bodega_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.bodega_id_bodega_seq OWNED BY public.bodega.id_bodega;

ALTER TABLE ONLY public.bodega
    ALTER COLUMN id_bodega SET DEFAULT nextval('public.bodega_id_bodega_seq'::regclass);

ALTER TABLE ONLY public.bodega
    ADD CONSTRAINT bodega_pkey PRIMARY KEY (id_bodega);

ALTER TABLE ONLY public.bodega
    ADD CONSTRAINT uq_bodega_centro_nombre UNIQUE (id_cformacion, nombre);

ALTER TABLE ONLY public.bodega
    ADD CONSTRAINT fk_bodega_cformacion
    FOREIGN KEY (id_cformacion) REFERENCES public.c_formacion(id_cformacion)
    ON UPDATE CASCADE ON DELETE RESTRICT;

-- 2. stand: el estante. Pertenece a una bodega.
CREATE TABLE public.stand (
    id_stand integer NOT NULL,
    id_bodega integer NOT NULL,
    nombre character varying(150) NOT NULL,
    estado boolean DEFAULT true
);

CREATE SEQUENCE IF NOT EXISTS public.stand_id_stand_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.stand_id_stand_seq OWNED BY public.stand.id_stand;

ALTER TABLE ONLY public.stand
    ALTER COLUMN id_stand SET DEFAULT nextval('public.stand_id_stand_seq'::regclass);

ALTER TABLE ONLY public.stand
    ADD CONSTRAINT stand_pkey PRIMARY KEY (id_stand);

ALTER TABLE ONLY public.stand
    ADD CONSTRAINT uq_stand_bodega_nombre UNIQUE (id_bodega, nombre);

ALTER TABLE ONLY public.stand
    ADD CONSTRAINT fk_stand_bodega
    FOREIGN KEY (id_bodega) REFERENCES public.bodega(id_bodega)
    ON UPDATE CASCADE ON DELETE RESTRICT;

-- 3. categoria: familia del producto. No lleva id_stand ni id_modulo.
CREATE TABLE public.categoria (
    id_categoria integer NOT NULL,
    id_cformacion integer NOT NULL,
    nombre character varying(150) NOT NULL,
    estado boolean DEFAULT true
);

CREATE SEQUENCE IF NOT EXISTS public.categoria_id_categoria_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.categoria_id_categoria_seq OWNED BY public.categoria.id_categoria;

ALTER TABLE ONLY public.categoria
    ALTER COLUMN id_categoria SET DEFAULT nextval('public.categoria_id_categoria_seq'::regclass);

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (id_categoria);

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT uq_categoria_centro_nombre UNIQUE (id_cformacion, nombre);

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT fk_categoria_cformacion
    FOREIGN KEY (id_cformacion) REFERENCES public.c_formacion(id_cformacion)
    ON UPDATE CASCADE ON DELETE RESTRICT;

-- 4. subcategoria: recorte de la categoria.
CREATE TABLE public.subcategoria (
    id_subcategoria integer NOT NULL,
    id_categoria integer NOT NULL,
    nombre character varying(150) NOT NULL,
    estado boolean DEFAULT true
);

CREATE SEQUENCE IF NOT EXISTS public.subcategoria_id_subcategoria_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.subcategoria_id_subcategoria_seq OWNED BY public.subcategoria.id_subcategoria;

ALTER TABLE ONLY public.subcategoria
    ALTER COLUMN id_subcategoria SET DEFAULT nextval('public.subcategoria_id_subcategoria_seq'::regclass);

ALTER TABLE ONLY public.subcategoria
    ADD CONSTRAINT subcategoria_pkey PRIMARY KEY (id_subcategoria);

ALTER TABLE ONLY public.subcategoria
    ADD CONSTRAINT uq_subcategoria_categoria_nombre UNIQUE (id_categoria, nombre);

ALTER TABLE ONLY public.subcategoria
    ADD CONSTRAINT fk_subcategoria_categoria
    FOREIGN KEY (id_categoria) REFERENCES public.categoria(id_categoria)
    ON UPDATE CASCADE ON DELETE RESTRICT;

-- 4b. unidad_medida: catalogo (Unidad, Litro, kg). No es del centro ni del modulo.
CREATE TABLE public.unidad_medida (
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

ALTER TABLE ONLY public.unidad_medida
    ADD CONSTRAINT unidad_medida_pkey PRIMARY KEY (id_unidad_medida);

ALTER TABLE ONLY public.unidad_medida
    ADD CONSTRAINT uq_unidad_medida_nombre UNIQUE (nombre);

ALTER TABLE ONLY public.unidad_medida
    ADD CONSTRAINT uq_unidad_medida_abreviatura UNIQUE (abreviatura);

INSERT INTO public.unidad_medida (nombre, abreviatura)
VALUES
    ('Unidad', 'und'),
    ('Litro', 'L'),
    ('Kilogramo', 'kg'),
    ('Galon', 'gal'),
    ('Metro', 'm'),
    ('1/4 galon', '1/4 gal'),
    ('Poma', 'poma');

-- 5. elemento: el producto. En el stand aparece el elemento, no la categoria.
CREATE TABLE public.elemento (
    id_elemento integer NOT NULL,
    id_subcategoria integer NOT NULL,
    id_stand integer NOT NULL,
    id_unidad_medida integer NOT NULL,
    nombre character varying(150) NOT NULL,
    codigo character varying(50),
    descripcion_tecnica text,
    marca character varying(80),
    url_fotografia character varying(500),
    cantidad integer NOT NULL DEFAULT 0,
    estado boolean DEFAULT true
);

CREATE SEQUENCE IF NOT EXISTS public.elemento_id_elemento_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.elemento_id_elemento_seq OWNED BY public.elemento.id_elemento;

ALTER TABLE ONLY public.elemento
    ALTER COLUMN id_elemento SET DEFAULT nextval('public.elemento_id_elemento_seq'::regclass);

ALTER TABLE ONLY public.elemento
    ADD CONSTRAINT elemento_pkey PRIMARY KEY (id_elemento);

ALTER TABLE ONLY public.elemento
    ADD CONSTRAINT ck_elemento_cantidad CHECK (cantidad >= 0);

ALTER TABLE ONLY public.elemento
    ADD CONSTRAINT uq_elemento_codigo UNIQUE (codigo);

ALTER TABLE ONLY public.elemento
    ADD CONSTRAINT fk_elemento_subcategoria
    FOREIGN KEY (id_subcategoria) REFERENCES public.subcategoria(id_subcategoria)
    ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY public.elemento
    ADD CONSTRAINT fk_elemento_stand
    FOREIGN KEY (id_stand) REFERENCES public.stand(id_stand)
    ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY public.elemento
    ADD CONSTRAINT fk_elemento_unidad_medida
    FOREIGN KEY (id_unidad_medida) REFERENCES public.unidad_medida(id_unidad_medida)
    ON UPDATE CASCADE ON DELETE RESTRICT;

-- 6. item: una unidad con serial. No va en la lista de Productos.
CREATE TABLE public.item (
    id_item integer NOT NULL,
    id_elemento integer NOT NULL,
    numero_serial character varying(80) NOT NULL,
    estado boolean DEFAULT true
);

CREATE SEQUENCE IF NOT EXISTS public.item_id_item_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.item_id_item_seq OWNED BY public.item.id_item;

ALTER TABLE ONLY public.item
    ALTER COLUMN id_item SET DEFAULT nextval('public.item_id_item_seq'::regclass);

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (id_item);

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_numero_serial_key UNIQUE (numero_serial);

ALTER TABLE ONLY public.item
    ADD CONSTRAINT fk_item_elemento
    FOREIGN KEY (id_elemento) REFERENCES public.elemento(id_elemento)
    ON UPDATE CASCADE ON DELETE RESTRICT;

-- Datos de ejemplo (se pueden borrar). Usan el primer centro del dump.
WITH centro AS (
    SELECT id_cformacion
    FROM public.c_formacion
    ORDER BY id_cformacion
    LIMIT 1
),
cat_herr AS (
    INSERT INTO public.categoria (id_cformacion, nombre)
    SELECT id_cformacion, 'Herramientas' FROM centro
    RETURNING id_categoria, id_cformacion
),
cat_seg AS (
    INSERT INTO public.categoria (id_cformacion, nombre)
    SELECT id_cformacion, 'Seguridad' FROM centro
    RETURNING id_categoria, id_cformacion
),
sub_man AS (
    INSERT INTO public.subcategoria (id_categoria, nombre)
    SELECT id_categoria, 'Manuales' FROM cat_herr
    RETURNING id_subcategoria
),
sub_inc AS (
    INSERT INTO public.subcategoria (id_categoria, nombre)
    SELECT id_categoria, 'Contra incendio' FROM cat_seg
    RETURNING id_subcategoria
),
bod_norte AS (
    INSERT INTO public.bodega (id_cformacion, nombre)
    SELECT id_cformacion, 'Bodega Norte' FROM centro
    RETURNING id_bodega
),
bod_taller AS (
    INSERT INTO public.bodega (id_cformacion, nombre)
    SELECT id_cformacion, 'Bodega Taller' FROM centro
    RETURNING id_bodega
),
st_b12 AS (
    INSERT INTO public.stand (id_bodega, nombre)
    SELECT id_bodega, 'Estante B-12' FROM bod_norte
    RETURNING id_stand
),
st_s02 AS (
    INSERT INTO public.stand (id_bodega, nombre)
    SELECT id_bodega, 'Estante S-02' FROM bod_taller
    RETURNING id_stand
),
und AS (
    SELECT id_unidad_medida FROM public.unidad_medida WHERE nombre = 'Unidad'
),
el_dest AS (
    INSERT INTO public.elemento (id_subcategoria, id_stand, id_unidad_medida, nombre, codigo, descripcion_tecnica, cantidad)
    SELECT sub_man.id_subcategoria, st_b12.id_stand, und.id_unidad_medida,
           'Destornillador Phillips #2', 'DEST-PH2',
           'Destornillador punta Phillips #2, uso manual.', 8
    FROM sub_man, st_b12, und
    RETURNING id_elemento
),
el_ext AS (
    INSERT INTO public.elemento (id_subcategoria, id_stand, id_unidad_medida, nombre, codigo, descripcion_tecnica, cantidad)
    SELECT sub_inc.id_subcategoria, st_s02.id_stand, und.id_unidad_medida,
           'Extintor PQS 10 lb', 'EXT-PQS-10',
           'Extintor PQS 10 lb, recargable.', 3
    FROM sub_inc, st_s02, und
    RETURNING id_elemento
)
INSERT INTO public.item (id_elemento, numero_serial)
SELECT el_ext.id_elemento, v.numero_serial
FROM el_ext
CROSS JOIN (VALUES ('EXT-019'), ('EXT-020'), ('EXT-021')) AS v(numero_serial);

COMMIT;
