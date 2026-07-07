# TopFripe

Site de fripe moderne avec frontend Next.js pour Vercel et API Express pour Render.

## Structure

- `apps/frontend`: boutique Next.js, Tailwind CSS, React, Framer Motion
- `apps/backend`: API Express, MongoDB Atlas, Cloudinary

## Installation

```bash
npm install
```

Copier les fichiers d'exemple puis remplir les valeurs:

```bash
cp apps/frontend/.env.example apps/frontend/.env.local
cp apps/backend/.env.example apps/backend/.env
```

## Developpement

```bash
npm run dev
```

- Frontend: `http://localhost:3000`
- API: `http://localhost:4000/api`

## Variables de production

Sur Vercel, configurer `NEXT_PUBLIC_API_URL` avec l'URL Render de l'API.

Sur Render, configurer `MONGODB_URI`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `CLIENT_URL` et `PORT`.

Important: ne pas mettre les vraies cles Cloudinary ou MongoDB dans Git. Si elles ont ete partagees publiquement, il vaut mieux les regenerer.
