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

## Admin

La page admin est disponible sur `/admin`.

Variables backend a configurer sur Render:

```env
ADMIN_EMAIL=admin@topfripe.com
ADMIN_PASSWORD=un-mot-de-passe-fort
ADMIN_TOKEN=une-longue-valeur-secrete
```

L'admin permet de creer, modifier et supprimer les categories et les produits.

## Contact

Variables frontend a configurer sur Vercel:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=21600000000
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/topfripe
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/topfripe
NEXT_PUBLIC_MAPS_URL=https://maps.google.com
NEXT_PUBLIC_SHOP_ADDRESS=Adresse de la boutique
```

Important: ne pas mettre les vraies cles Cloudinary ou MongoDB dans Git. Si elles ont ete partagees publiquement, il vaut mieux les regenerer.
