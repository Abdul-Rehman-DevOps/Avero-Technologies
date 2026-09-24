# Avero Technologies — Corporate Website

Production-ready Next.js site for **Avero Technologies**: marketing pages, content APIs, and an authenticated Employee Portal.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v3 with Light / Dark / Blueprint themes
- Filesystem content under `content/public` (CMS-ready `ContentRepository`)
- Zod-validated APIs: contact, careers, insights, newsletter, portal auth
- Docker multi-stage image + Compose

## Pages

| Area | Routes |
| --- | --- |
| Marketing | `/`, `/about`, `/services`, `/solutions`, `/industries`, `/work` (case studies), `/careers`, `/insights`, `/contact` |
| Trust & legal | `/security`, `/trust`, `/privacy`, `/terms`, `/cookies` |
| Employee Portal | `/portal/login`, `/portal`, `/portal/directory`, `/portal/announcements` |

## APIs

| Endpoint | Purpose |
| --- | --- |
| `POST /api/contact` | Lead form (validated + rate limited) |
| `GET /api/careers` | Job listings (`?slug=` for detail) |
| `GET /api/insights` | Blog/insights feed (`?slug=` for detail) |
| `POST /api/newsletter` | Newsletter subscribe |
| `POST /api/auth/login` | Portal authentication |
| `POST /api/auth/logout` | Clear session |
| `GET /api/auth/me` | Current portal user |
| `GET /health` | Liveness |

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open http://localhost:3000

### Quality gates

```bash
npm run typecheck
npm test
npm run lint
npm run validate:content
npm run build
```

## Employee Portal

Staff-only area at `/portal`. Accounts come from environment variables — there are **no demo users**.

Required:

- `PORTAL_SESSION_SECRET` (16+ characters)
- `PORTAL_ADMIN_EMAIL` / `PORTAL_ADMIN_PASSWORD`

Optional extra employees: `PORTAL_USERS` JSON array (see `.env.example`).

## Docker (WSL / Linux)

Docker requires root on this host:

```bash
sudo docker compose up --build -d
```

Health: http://localhost:3000/health

## Environment

See `.env.example`. Never commit real SMTP or session secrets.

## Design notes

See `docs/avero-design-synthesis.md` for the research-backed (but original) design system.
