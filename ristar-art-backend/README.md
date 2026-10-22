# ristar-art-backend

API for [whiterobesdevelopment.co.za](https://whiterobesdevelopment.co.za).

The website itself is a fully static SvelteKit build (`../ristar-art`) with no
server of its own. This service exists for the one thing a static site cannot
do: accept a contact-form submission and deliver it as email.

Express 5 + TypeScript, no database.

## Endpoints

| Method | Path           | Purpose                                          |
| ------ | -------------- | ------------------------------------------------ |
| `GET`  | `/health`      | Liveness probe. Reports whether email is configured. |
| `POST` | `/api/contact` | Validate an enquiry and send it via Resend.      |

### `POST /api/contact`

```jsonc
// request
{
  "name": "Thandi Dube",
  "email": "thandi@example.co.za",
  "projectType": "Web Application",
  "message": "We need a booking system.",
  "company": ""                 // honeypot — must stay empty
}
```

| Status | Body                                        | Meaning                        |
| ------ | ------------------------------------------- | ------------------------------ |
| `200`  | `{ "ok": true }`                            | Sent (or silently dropped bot) |
| `400`  | `{ "error": "...", "errors": { ... } }`     | Validation failed, per field   |
| `403`  | `{ "error": "Origin not allowed." }`        | Origin not in `CORS_ORIGINS`   |
| `429`  | `{ "error": "..." }`                        | Rate limited                   |
| `502`  | `{ "error": "..." }`                        | Resend unreachable or refused  |
| `503`  | `{ "error": "..." }`                        | `RESEND_API` not set           |

## Developing

```sh
npm install
cp .env.example .env     # fill in RESEND_API
npm run dev              # tsx watch, :8080
```

Point the frontend at it with `PUBLIC_API_BASE=http://localhost:8080` in
`../ristar-art/.env`.

## Building

```sh
npm run build            # tsc -> dist/
npm start                # node dist/index.js
npm run typecheck
```

## Configuration

All config is read once at boot in `src/env.ts`. Anything the server cannot run
correctly without is checked there, so a misconfigured deploy fails on startup
rather than on a visitor's first enquiry.

| Variable        | Required            | Default                        | Notes                                              |
| --------------- | ------------------- | ------------------------------ | -------------------------------------------------- |
| `PORT`          | no                  | `8080`                         |                                                     |
| `NODE_ENV`      | no                  | `development`                  | `production` tightens the checks below              |
| `CORS_ORIGINS`  | **yes in prod**     | localhost dev + preview        | Comma-separated browser origins                     |
| `TRUST_PROXY`   | behind a proxy      | `false`                        | Hop count, or `loopback`. See below                 |
| `RESEND_API`    | **yes in practice** | —                              | Without it `/api/contact` returns 503               |
| `CONTACT_TO`    | no                  | `mochochokoboiketlo@gmail.com` | Where enquiries land                                |
| `RESEND_FROM`   | no                  | `onboarding@resend.dev`        | Must be a domain verified in Resend                 |

### `TRUST_PROXY` matters

Rate limiting buckets by client IP. Behind a reverse proxy (Render, Railway,
Fly, nginx) every request arrives from the proxy's address, so without
`TRUST_PROXY` set, one bot locks the form for everybody. Set it to the number
of proxies in front of the app — usually `1`.

## Deploying

The `Dockerfile` is a two-stage build producing a slim runtime image that runs
as the `node` user.

```sh
docker build -t ristar-art-backend .
docker run -p 8080:8080 --env-file .env ristar-art-backend
```

On a platform that builds from source instead, set the build command to
`npm ci && npm run build` and the start command to `npm start`.

Whatever the host, set `CORS_ORIGINS` to the real site origin(s) and
`TRUST_PROXY=1`.

### Live configuration

This service is served from `api.whiterobesdevelopment.co.za`:

```sh
CORS_ORIGINS=https://whiterobesdevelopment.co.za,https://www.whiterobesdevelopment.co.za
TRUST_PROXY=1
RESEND_API=re_...
```

The frontend already points at it — `../ristar-art/.env.production` sets
`PUBLIC_API_BASE=https://api.whiterobesdevelopment.co.za`.

Note that `api.whiterobesdevelopment.co.za` is **not** in `CORS_ORIGINS`.
That list is the origins of the site making the request, never the API's own
origin — a browser never sends a cross-origin request to itself.
