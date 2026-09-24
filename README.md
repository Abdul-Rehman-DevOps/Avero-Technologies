# Avero Technologies Corporate Website

Production-ready Next.js site for **Avero Technologies**: marketing pages and content APIs.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v3 (light mode)
- Filesystem content under `content/public` (CMS-ready `ContentRepository`)
- Zod-validated APIs: contact, careers, insights, newsletter
- Docker multi-stage image + Compose

## Pages

| Area | Routes |
| --- | --- |
| Marketing | `/`, `/about`, `/services`, `/solutions`, `/industries`, `/work` (case studies), `/careers`, `/insights`, `/contact` |
| Trust & legal | `/security`, `/privacy`, `/terms`, `/cookies` |

## APIs

| Endpoint | Purpose |
| --- | --- |
| `POST /api/contact` | Contact form (validated + rate limited) |
| `GET /api/careers` | Job listings (`?slug=` for detail) |
| `GET /api/insights` | Blog/insights feed (`?slug=` for detail) |
| `POST /api/newsletter` | Newsletter subscribe |
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

## Docker (WSL / Linux)

```bash
sudo docker compose up --build -d
```

Health: http://localhost:3000/health

## Environment

See `.env.example`. Never commit real SMTP or API secrets.
