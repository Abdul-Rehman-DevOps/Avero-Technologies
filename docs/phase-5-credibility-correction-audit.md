# AVERO — CONTENT + CREDIBILITY + UX CORRECTION AUDIT

**Date:** 2026-09-16  
**Scope:** Mandatory correction on existing Phase 5+ site (not a rewrite from scratch)

---

## Checklist

| Check | Result | Evidence |
| --- | --- | --- |
| No fake certifications | **PASS** | `/trust` redirects to `/about`; removed from nav + sitemap; no badge UI |
| No fake clients / logo walls | **PASS** | No Trusted-by sections |
| No fake testimonials | **PASS** | None present |
| No fake metrics | **PASS** | None present |
| No fake partnerships | **PASS** | Technology page states familiarity ≠ partnership |
| No fake compliance claims | **PASS** | Security describes practices only |
| No invented employee info | **PASS** | Abdul Rehman only; bio null; no invented history |
| No invented company history | **PASS** | About uses principles, not fictional timeline |
| No generic AI copy (primary UI) | **PASS** | Homepage/about/security/contact rewritten |
| No excessive em dashes (UI) | **PASS** | User-facing copy cleaned; content MD cleaned |
| No repetitive buzzwords | **PASS** | Banned phrase scan clear in src/content |
| CEO correctly represented | **PASS** | Same person as CTO |
| CTO correctly represented | **PASS** | Same personSlug `abdul-rehman` on both seats |
| Phone correct | **PASS** | `siteConfig.phoneDisplay` / `phoneTel`; footer + contact + JSON-LD |
| Security page works | **PASS** | Practice list, no Trust CTA |
| Careers / Company / People / Contact | **PASS** | Routes updated |
| Navigation without Trust | **PASS** | Company panel: About, Leadership, People, Engineering, Security, Careers, Contact |
| Credentials future support | **PASS** | `Credential` type + `content/public/credentials/index.json` + `getCredentials()` (verified+public only) |
| Production checks | **PASS** | typecheck / lint / test / validate:content (run this session) |

---

## Residual

- Multi-viewport screenshot matrix still recommended for visual QA.
- Public email/social still intentionally null until configured.
- Additional employee profiles can be added to `people/index.json` without inventing data.
