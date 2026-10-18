# Abjad Games website

Source for [abjadgames.net](https://abjadgames.net). React + Vite + Tailwind, with a Supabase backend for news, the contact form and `/admin`.

## Develop

```sh
npm ci
npm run dev
```

## Deploy

Every push to `main` builds the site and publishes it to GitHub Pages (`.github/workflows/deploy.yml`). The custom domain is set in the repo's Pages settings; DNS lives at Hostinger.

The build copies `index.html` to `404.html` so client-side routes work, and to `<route>.html` for the public pages that get shared (`/news`, `/careers`, `/alraiy`) so those answer with a 200. Add a route there when you add a public page.
