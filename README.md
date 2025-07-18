# quiquoitek Demo

Ce projet est un exemple simple d'API REST en **Node.js** permettant de gérer une bibliothèque. Il expose un CRUD pour deux entités : `quis` et `quois` stockées dans une base **PostgreSQL**.
Une petite interface HTML est également fournie pour manipuler ces données.

## Prérequis

- [Node.js](https://nodejs.org) >= 16
- [PostgreSQL](https://www.postgresql.org/) (une base de données accessible)

## Installation

1. Clonez le dépôt puis installez les dépendances :

```bash
npm install
```

2. Copiez le fichier `.env.example` vers `.env` et renseignez l'URL de connexion à votre base :

```bash
cp .env.example .env
```
ee
3. Créez les tables à l'aide du script SQL :

```bash
psql "$DATABASE_URL" -f db/schema.sql

(fred: ko car demande "Password for user frede: " que je ne connais pas
du coup : 
    1.pgadmin ;>object explorer ;>servers/PostgreSQL 17/Databases : create database "quiquoitek"
    2.pgadmin ;> tools ;> plsql ;> coller le texte de schema.sql dans le terminal qui s'est ouvert
résultat : 2 tables créées
)
```

## Lancer le serveur

En développement :
fred: à faire à l'inisialisation du projet (inutile lors des "clone" où seul "npm install" suffit
        sinon: si on refait les npm i, alors on monte en version dans les packages "pg" "express" etc..) 
    npm i nodemon 
    npm i express
    npm i pg

```bash
npm run dev
```

En production :

```bash
npm start

```
`http://localhost:3000/` dans le navigateur -> chargement de index.html (l'interface HTML permettant de gérer auteurs et livres.)

## Endpoints

- `GET /quis` – liste des auteurs
- `GET /quis/:id` – récupérer un auteur
- `POST /quis` – créer un auteur `{ name }`
- `PUT /quis/:id` – mettre à jour un auteur `{ name }`
- `DELETE /quis/:id` – supprimer un auteur

- `GET /quois` – liste des livres
- `GET /quois/:id` – récupérer un livre
- `POST /quois` – créer un livre `{ title, author_id }`
- `PUT /quois/:id` – mettre à jour un livre `{ title, author_id }`
- `DELETE /quois/:id` – supprimer un livre

## Structure du projet

- `src/app.js` – point d'entrée de l'application Express
- `src/db/index.js` – gestion de la connexion PostgreSQL
- `src/routes/` – routes Express
- `src/controllers/` – logique des handlers
- `db/schema.sql` – script de création des tables

Ce dépôt fournit ainsi une base pour comprendre et expérimenter un CRUD Node.js/Express avec PostgreSQL.
