# Production readiness QA — themes, contact, legal, profile

**Date:** 2026-09-16

## Themes (3)

| Theme | Intent | Notes |
| --- | --- | --- |
| Light | Atelier chalk | Cool surfaces, deep ink, teal CTAs with white label text |
| Dark | Engine room | Softer contrast, less neon, readable body |
| Blueprint | Slate-blue atelier | Cooler night palette; cycles via header Theme control |

Boot script + `localStorage` (`avero-theme`) prevent FOUC. Toggle cycles Light → Dark → Blueprint → Light.

## Contact & identity

- Public email: `abdulrehman.devops@gmail.com` (site config, org JSON, contact, footer, JSON-LD)
- Phone unchanged: +92 303 9692131
- Profile photo: `/people/abdul-rehman.jpg` on Leadership, People, homepage organization

## Legal (production pages)

- `/terms`, `/privacy`, `/cookies` — full policies with effective date, company contact, indexed in sitemap
- Not a substitute for counsel review on entity-specific clauses; content is deployable baseline

## Contrast / UX fixes

- Primary buttons use `--on-signal` (white) so labels stay readable in dark/blueprint
- Header uses theme-aware `--header-bg`
- Selection color themed

## Security note for deploy

- Do **not** commit `.env`. Prefer Gmail **app password** (not account password) if using SMTP.
- Set `NEXT_PUBLIC_SITE_URL` to the real production domain before go-live.
- Rotate any password previously stored in plaintext env files.

## Automated gates

Run: `npm run typecheck && npm test && npm run lint && npm run build`
