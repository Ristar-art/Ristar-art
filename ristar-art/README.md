# White Robes Development — website

Marketing site for [whiterobesdevelopment.co.za](https://whiterobesdevelopment.co.za).

A **fully static** SvelteKit build. Every page is prerendered to HTML at build
time, so `build/` can be served by any static host or CDN with no Node process.

The one thing a static site cannot do — receive a contact-form submission and
send it as email — lives in a separate service at [`../ristar-art-backend`](../ristar-art-backend).

```
Ristar-art/
├── ristar-art/           this package — static site
└── ristar-art-backend/   Express API for the contact form
```

## Developing

```sh
npm install
cp .env.example .env     # set PUBLIC_API_BASE
npm run dev              # :5173
```

The contact form needs the API running too:

```sh
cd ../ristar-art-backend && npm run dev   # :8080
```

## Building

```sh
npm run build            # static output into build/
npm run preview          # serve that output locally
npm run check            # svelte-check / typecheck
```

`build/` contains plain HTML, CSS, JS and images, plus precompressed `.gz` and
`.br` variants. Upload it anywhere: Netlify, Cloudflare Pages, Vercel, GitHub
Pages, S3 + CloudFront, or an nginx box.

`404.html` is emitted for unknown paths — static hosts serve it with a real 404
status, giving visitors the site's own error page rather than the host default.

## Configuration

One variable, read at **build time**:

| Variable          | Value                                     | Set in             |
| ----------------- | ----------------------------------------- | ------------------ |
| `PUBLIC_API_BASE` | `https://api.whiterobesdevelopment.co.za` | `.env.production`  |
| `PUBLIC_API_BASE` | `http://localhost:8080`                   | `.env` (yours)     |

`.env.production` is committed and already correct, so `npm run build`
produces a bundle pointing at the live API with no extra setup. It holds only
`PUBLIC_` vars, which are inlined into the client bundle and visible in page
source — never put a secret in it.

`npm run dev` uses `.env` instead, so local development talks to a local
backend. (`npm run preview` serves the production build, so it hits the live
API — that is intended.)

Because the value is inlined at build time, changing it means rebuilding and
redeploying. It must also appear in the backend's `CORS_ORIGINS`, exactly,
scheme included, or the browser blocks every submission.

## Site metadata

`src/lib/site.ts` is the single source of truth for the domain, business name,
founder, contact address and GitHub link. Change `SITE_URL` there and every
canonical tag, Open Graph URL and JSON-LD reference follows.

`static/sitemap.xml` and `static/robots.txt` hold the domain literally and must
be updated by hand if it ever changes again.

## Design system

Defined as CSS custom properties in `src/routes/layout.css`.

The page surface is bone (`#f7f6f2`) with near-ink text (`#17181c`); dark is a
band treatment used for the header, hero, CTA and footer only.

**Lime (`#ccff00`) is a fill, never text.** On white it measures 1.17:1 and is
effectively invisible. Put ink on lime — that is what the `// 01` section chips
and the CTA panels do. Lime as a text colour is only safe on the dark bands.
