-- Table: public.qui

DROP TABLE IF EXISTS public.qui;

CREATE TABLE IF NOT EXISTS public.qui
(
    id integer,
    nom character varying(50) COLLATE pg_catalog."default",
    prenom character varying(50) COLLATE pg_catalog."default",
    fullname character varying(50) COLLATE pg_catalog."default",
    genre character varying(1) COLLATE pg_catalog."default",
    domaine character varying(50) COLLATE pg_catalog."default",
    pays character varying(50) COLLATE pg_catalog."default",
    style character varying(50) COLLATE pg_catalog."default",
    remarque character varying(1000) COLLATE pg_catalog."default",
    creatts character varying(20) COLLATE pg_catalog."default",
    modifts character varying(20) COLLATE pg_catalog."default",
    datenaiss character varying(10) COLLATE pg_catalog."default",
    datedeces character varying(10) COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.qui
    OWNER to postgres;