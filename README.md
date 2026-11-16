# Portfolio — dvachette.fr

![Vue 3](https://img.shields.io/badge/Vue-3-42b883?logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-latest-646cff?logo=vite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-multi--stage-2496ed?logo=docker&logoColor=white)
![CI/CD](https://img.shields.io/badge/GitHub_Actions-CD-2088ff?logo=github-actions&logoColor=white)
![Status](https://img.shields.io/badge/status-en_prod-brightgreen)
![Site](https://img.shields.io/badge/site-dvachette.fr-fcad0f)

Portfolio personnel développé avec Vue 3 et TypeScript, déployé en production sur [dvachette.fr](https://dvachette.fr).

## Stack

- **Vue 3** + **TypeScript** + **Vite**
- **Docker** multi-stage
- **Nginx** (serving)
- **GitHub Actions** (déploiement automatique sur push `main`)

## Déploiement

Chaque push sur `main` déclenche la pipeline GitHub Actions :

1. Build de l'image Docker multi-stage
2. Push sur le VPS via SSH
3. Redémarrage du conteneur

## Lancer en local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## API d'administration (backend)

Les données du portfolio (`portfolio-backend/data/*.json`) se modifient via les routes `/admin/*` du backend.
Seul le backend du panel admin les appelle, en local sur le VPS (`http://127.0.0.1:3003`), avec un jeton partagé.

### Configuration

Générer un jeton (64 caractères hexadécimaux) et le placer dans `portfolio-backend/.env` **et** dans le `.env` du backend du panel admin :

```bash
openssl rand -hex 32
```

```env
ADMIN_API_TOKEN=<jeton>
```

Sans `ADMIN_API_TOKEN`, les routes `/admin/*` répondent `503` (le reste du site fonctionne normalement).
Un jeton de moins de 32 caractères empêche le démarrage.

Chaque requête doit porter l'en-tête :

```
Authorization: Bearer <jeton>
```

Comme les appels se font en local, la route peut aussi être fermée au public dans le vhost nginx de l'API :

```nginx
location /admin/ { return 404; }
```

### Routes

La spécification complète (routes publiques et admin, schémas, codes d'erreur) est dans [`portfolio-backend/openapi.yaml`](portfolio-backend/openapi.yaml) (OpenAPI 3.1).

| Ressource | Routes |
|---|---|
| `/admin/projects` | `GET /`, `GET /:id`, `POST /`, `PUT /:id`, `PATCH /:id`, `DELETE /:id` |
| `/admin/experiences` | idem |
| `/admin/education` | idem (`formations.json`) |
| `/admin/certifications` | idem |
| `/admin/interests` | idem |
| `/admin/skills` | `GET /`, `POST /` (section), `PATCH /:section`, `DELETE /:section` |
| `/admin/skills/:section/skills` | `POST /`, `PUT /:id`, `PATCH /:id`, `DELETE /:id` |

- `PUT` remplace l'élément entier, `PATCH` fusionne les champs envoyés (`null` supprime un champ optionnel). L'`id` vient toujours de l'URL.
- Les sections de compétences n'ont pas d'id : `:section` est leur index dans `skills.json`.
- Les corps sont validés strictement (champs requis, types, énumérations, dates `YYYY-MM-DD`, aucun champ inconnu) → `400`.
- `409` si un id existe déjà, si un projet référence une compétence inconnue, ou si on supprime une compétence encore utilisée par un projet.
- Les écritures sont sérialisées par fichier et atomiques (fichier temporaire puis `rename`).
