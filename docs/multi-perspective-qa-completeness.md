# Multi-perspective QA + Completeness Pass

**Date:** 2026-09-16  
**Scope:** Full-site QA (product, UX, SEO, credibility, content wiring) + missing Solutions/Services surfacing

---

## Verdict

Site is **complete for honest Stage A**: all primary IA routes work, Solutions are first-class (content + homepage + cross-links), placeholders stay non-deceptive and largely de-indexed, theme FOUC is addressed, automated gates pass.

---

## Perspectives

| Lens | Finding | Action taken |
| --- | --- | --- |
| Product / IA | Homepage skipped Solutions & Services; Work had no `/work` CTA | Added Solutions + Services sections; Work + View work; model cards link to destinations |
| Solutions | Thin MDX + weak detail cross-links | Deepened 3 solution bodies earlier; detail page related capabilities/services + CTA; capability pages link related solutions |
| Services | Approach arrows corrupted to `?` | Restored UTF-8 `→` across all 20 service files |
| SEO | Placeholder case study + legal drafts indexable | Sitemap excludes placeholders & legal drafts; `noIndex` on work placeholders + privacy/terms/cookies |
| Theme / UX | Dark preference flashed light | Blocking boot script on `<html>`; toggle waits for DOM theme |
| Interaction | Hero schematic lacked domain controls | Controls shown whenever `interactive` |
| Nav / Footer | Work & Industries underlinked | Added to Company nav + footer directory |
| Credibility | No fake clients/certs/metrics | Preserved; Work remains honest placeholder |

---

## Automated gates

| Check | Result |
| --- | --- |
| typecheck | PASS |
| vitest (8) | PASS |
| content validate | PASS |
| production build | PASS |

---

## Intentionally not inventing

- Extra case studies, certifications, client logos, metrics, testimonials
- Public email / social (null until real)
- Additional insights or open jobs without real content
- Additional solution verticals beyond the three published outcome patterns

---

## Manual spot-check (after `npm run start` or `npm run dev`)

1. Hard refresh → dark preference should not flash light
2. Home → Solutions list + Services grid + Work “View work”
3. Hero schematic → node + control click navigates
4. `/solutions/[slug]` → related services/capabilities
5. `/capabilities/cloud` → related solutions block
6. `/sitemap.xml` → no `architecture-template`, no privacy/terms/cookies
7. `/work/architecture-template` → `noindex` in metadata (if route kept for structure)

---

## Residual backlog (honest empties)

- Real case studies when consented
- Legal copy when counsel-ready (pages exist, noindexed)
- More insights / careers when available
- `NEXT_PUBLIC_SITE_URL` must be set in production for correct canonicals
