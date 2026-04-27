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
