# AVERO TECHNOLOGIES — PHASE 3: ARCHITECTURE

**Status:** COMPLETE (pending stakeholder validation)  
**Date:** 2026-09-16  
**Depends on:** Phase 1 (approved), Phase 2 (pending final confirm; direction assumed locked), **Company Context Update (multi-employee organization)**  
**Constraint:** No production implementation until this document passes quality gate

---

## 0. Context lock

AVERO TECHNOLOGIES is a **real, multi-employee technology company** with multiple disciplines — not a personal portfolio or solo consultancy.

All architecture treats the site as the public face of a **growing organization** that can later become a **corporate content platform** and **product ecosystem**, without a rewrite.

**Non-overengineering rule:** v1 remains a simple, secure marketing + content site. Growth is enabled by **content models, URL contracts, and clear boundaries** — not by premature microservices, Kubernetes, auth portals, or databases.

---

## 1. Evolution strategy (no rewrite path)

```
Stage A — Company Website (v1)
  Public marketing + structured content files
  Contact intake API
  Empty-state ready for people/work/jobs/trust

Stage B — Corporate Content Platform
  Headless CMS or Git-based CMS
  Editorial workflow (draft/review/publish)
  Media library; taxonomy management

Stage C — Multi-team Organization surface
  Public pillar pages + selective leadership
  Careers ATS integration or CMS jobs
  Optional private CMS roles (editors per pillar)

Stage D — Technology Product Ecosystem
  First-class Product entity + /products routes
  Docs/portal as separate apps sharing design system & SSO later
  Still not forced into Services taxonomy
```

| Concern | Stage A | Stage B | Stage C | Stage D |
| --- | --- | --- | --- | --- |
| Content source | `content/**` MD/MDX + YAML | CMS API adapter | CMS + RBAC | CMS + product registry |
| App shape | Monolith Next.js | Same app | Same app + optional admin | Apps: web, docs, app.* |
| Data store | Files (+ optional form queue) | CMS | CMS + optional DB | Product DBs isolated |
| Auth | None public | CMS-only | CMS-only | Customer SSO separate |
| Infra | CDN host | CDN host | CDN + WAF | Per-product as needed |

**Adapter pattern:** UI reads from a `ContentRepository` interface. v1 = filesystem. Later = CMS. Pages do not hardcode content shape twice.

---

## 2. Updated information architecture

### 2.1 Entity layers (critical distinction)

| Layer | Meaning | Example |
| --- | --- | --- |
| **Company** | Legal/brand organization | AVERO TECHNOLOGIES |
| **Pillars** | Organizational capability units | Avero AI, Cloud, Security… |
| **Services** | Commercial offerings sold to clients | “Cloud Migration”, “RAG Systems Engagement” |
| **Technology capabilities** | Tools/platforms/methods we engineer with | Kubernetes, Terraform, LLMs (not a sales page duplicate) |
| **Solutions** | Outcome/problem framing | “Secure multi-cloud platform” |
| **Industries** | Customer sectors (capability fit) | FinTech, Healthcare… |
| **People** | Employees / leadership (public subset) | CTO profile when approved |
| **Work** | Case studies / projects / research | Published engagements |
| **Insights** | Editorial technical content | Articles |
| **Products** (future) | Proprietary offerings | SaaS / APIs / tools — **not** Services |

**Anti-duplication rule:**  
- `/services/*` = what we sell / engage on  
- `/technology` = how we engineer (taxonomy of platforms & methods)  
- `/pillars/*` = who (org units) owns capability depth  
A service may **reference** a pillar and technologies; it must not paste the entire technology page.

### 2.2 Updated URL map

#### Company
| Path | Purpose |
| --- | --- |
| `/` | Home — company positioning |
| `/about` | Company story, mission, operating principles |
| `/about/leadership` | Leadership index (placeholders until real) |
| `/about/leadership/[slug]` | Public leader profile |
| `/contact` | B2B inquiry |
| `/privacy` `/terms` `/cookies` | Legal shells |

#### Pillars
| Path | Purpose |
| --- | --- |
| `/pillars` | Org capability map |
| `/pillars/ai` | Avero AI |
| `/pillars/engineering` | Avero Engineering |
| `/pillars/cloud` | Avero Cloud |
| `/pillars/platform` | Avero Platform |
| `/pillars/security` | Avero Security |
| `/pillars/data` | Avero Data |
| `/pillars/labs` | Avero Labs (research framing) |

#### Services (commercial)
| Path | Purpose |
| --- | --- |
| `/services` | Hub grouped **by pillar** |
| `/services/[slug]` | Commercial service detail |

*Initial service slugs remain scalable; ownership mapped via `pillar` field (see §4).*  
Automation / observability / DevSecOps etc. attach to pillars Platform or Security — not as fake “departments.”

#### Technology (not services)
| Path | Purpose |
| --- | --- |
| `/technology` | Ecosystem taxonomy |
| `/technology/[category]` | Optional deep pages later |

#### Solutions / Industries / Method / Security narrative
| Path | Purpose |
| --- | --- |
| `/solutions` `/solutions/[slug]` | Problem/outcome pages |
| `/industries` `/industries/[slug]` | Sector pages |
| `/engineering` | Company engineering method (process) |
| `/security` | Company security philosophy (cross-pillar) |

#### Work / Insights / Careers / Trust / Products
| Path | Purpose |
| --- | --- |
| `/case-studies` `/case-studies/[slug]` | Work |
| `/insights` `/insights/[slug]` | Editorial |
| `/careers` | Culture + departments + listings |
| `/careers/[slug]` | Job detail |
| `/trust` | Certifications/compliance/partners — **empty until real** |
| `/products` | Reserved Stage D (404 or “coming” only if intentional; prefer unlisted until ready) |

#### System
`/health` `/ready` · `/sitemap.xml` · `/robots.txt` · 404/500

### 2.3 Navigation (aligned with Phase 2 compression)

**Primary:** Pillars (or Services) · Solutions · Security · Insights · Careers · About · **Start a Conversation**  
**Secondary / footer:** Technology, Engineering, Industries, Case Studies, Trust, all pillars, legal  

Careers elevated (corporate growth signal). Leadership under About.

---

## 3. Organizational content model

### `Organization` (singleton)
```yaml
legalName: AVERO TECHNOLOGIES
brandName: AVERO
tagline: Engineering the Next.
domain: avero.com          # aspirational until registered
locations: []                 # { id, name, city, country, public: true|false }
pillars: [ai, engineering, cloud, platform, security, data, labs]
publicContact:
  email: null                 # placeholder until provided
  phone: null
social: []                    # only real accounts
schemaOrg: Organization
```

### `Pillar`
```yaml
id: ai
slug: ai
name: Avero AI
summary: string
mandate: string               # org purpose
capabilities: [string]        # capability IDs or inline list
relatedServiceSlugs: []
relatedTechnologyIds: []
status: active | forming | research
visibility: public | unlisted
seo: { title, description }
```

**Labs rule:** default `status: research`; copy must not claim commercial delivery of unestablished tech.

---

## 4. Services model (commercial)

### `Service`
```yaml
slug: cloud-migration
title: Cloud Migration
pillar: cloud                 # required — org ownership
summary: string
problem: string
approach: string
engagementTypes: []           # advisory | build | operate | assess
capabilities: []              # commercial capability bullets
outcomes: []                  # non-fabricated, qualitative OK
technologyRefs: []            # links to TechnologyCapability ids
industryRefs: []
solutionRefs: []
status: published | draft | placeholder
seo: { title, description, canonical }
```

**Grouping:** Services hub renders sections by `pillar`.  
**Not a pillar duplicate:** service pages emphasize commercial engagement; pillar pages emphasize team mandate and depth.

---

## 5. Technology capability model

### `TechnologyCapability`
```yaml
id: kubernetes
name: Kubernetes
category: containers          # cloud | containers | infrastructure | platform | observability | security | ai | data
layer: tool | method | platform
pillars: [platform, cloud]
notes: string                 # optional engineering context
partnerClaim: false           # MUST remain false unless verified
visibility: public
```

### `TechnologyCategory` (taxonomy for `/technology`)
Categories match Phase 1/2: Cloud, Containers, Infrastructure, Platform, Observability, Security, AI, Data.

**Separation:** Technology pages never use sales CTAs as the primary content model; CTAs may appear once at section end.

---

## 6. Industries model

### `Industry`
```yaml
slug: fintech
title: FinTech
summary: string
useCases: []                  # hypothetical capability fit — labeled as such if not evidenced
relatedServiceSlugs: []
relatedPillars: []
evidenceLevel: none | directional | evidenced
status: published | draft
```

**Rule:** If `evidenceLevel: none`, UI copy = capability applicability, not “our clients in X.”

---

## 7. Solutions model

### `Solution`
```yaml
slug: secure-multi-cloud-platform
title: string
problem: string
outcome: string
approach: string
relatedServiceSlugs: []
relatedPillars: []
relatedTechnologyIds: []
status: published | draft | placeholder
```

Solutions answer “what business/technical outcome?” Services answer “what engagement do we sell?”

---

## 8. Case-study / work model

### `CaseStudy`
```yaml
slug: string
title: string
visibility: public | private | placeholder
client:
  displayName: string | null  # null or "Confidential" if NDA
  consent: boolean
pillars: []
services: []
problem: string
context: string
architecture: string          # markdown / mdx
technology: []
engineeringChallenge: string
securityConsiderations: string
implementation: string
results: string               # NEVER invent metrics
lessonsLearned: string
diagrams: []
seo: {}
status: draft | published | placeholder
```

Placeholders use `status: placeholder` + `PlaceholderNotice` component.

---

## 9. Insights model

### `Insight`
```yaml
slug: string
title: string
seoTitle: string
metaDescription: string
canonical: string
authors: [peopleSlug]         # public people only
publishedAt: ISO
updatedAt: ISO
category: ai | cloud | cybersecurity | devops | devsecops | kubernetes | platform | sre | software | automation | emerging | data
tags: []
readingTimeMinutes: number
featuredImage: { src, alt }
body: mdx
relatedServiceSlugs: []
relatedPillars: []
jsonLd: Article
status: draft | published
```

---

## 10. People / leadership model

### `Person` (canonical record — may be non-public)
```yaml
id: uuid
slug: string | null             # only if public
displayName: string
roleTitle: string               # e.g. Chief Technology Officer
leadershipLevel: founder | c-level | vp | director | head | lead | ic | none
team: pillarId | corporate | null
expertise: []
locationId: string | null
bioPublic: string | null
bioInternal: string | null      # NEVER published
imagePublic: path | null
links:
  linkedin: url | null
  other: []                     # public only
visibility: public | internal
employmentStatus: active | alumni | contractor
showOnLeadership: boolean
showOnTeamPages: boolean        # future
```

### Public vs internal boundary
| Field | Public site | Internal CMS/HR (future) |
| --- | --- | --- |
| displayName, public role, public bio, public photo, LinkedIn | If `visibility: public` | Yes |
| personal email, phone, address, salary, ID docs | **Never** | HR systems only |
| `bioInternal`, performance, private notes | **Never** | Internal only |

**v1:** Ship schema + `/about/leadership` with **explicit placeholders** (no invented names).  
**No** employee directory scraping onto the public site by default.

### `LeadershipSeat` (role slots without inventing people)
```yaml
seatId: ceo
title: Chief Executive Officer
personId: null                  # unfilled
sortOrder: 1
required: false
```

UI lists seats; empty seats show “To be announced” — not fake executives.

---

## 11. Careers / job model

### `Job`
```yaml
slug: senior-platform-engineer-lahore
title: Senior Platform Engineer
department: platform            # maps to pillar or corporate (People, GTM, etc.)
team: string | null
locationIds: []
locationType: onsite | hybrid | remote
employmentType: full-time | part-time | contract | internship
seniority: junior | mid | senior | staff | principal | director
description: mdx
responsibilities: []
requirements: []
niceToHave: []
applicationProcess: mdx         # or shared default
applyUrl: url | null            # external ATS later
applyEmail: string | null
status: open | closed | draft
publishedAt: ISO
closesAt: ISO | null
```

### Careers IA
- `/careers` — culture sections (content-driven; empty until real) + filters (department, location, seniority) + list  
- `/careers/[slug]` — job detail  
- Shared `ApplicationProcess` default content object  

Adding/removing jobs = content entries only.

### Culture content objects (no fabrication)
`CultureTheme` entries: engineering, security, learning, collaboration, innovation, research, employeeExperience — each `status: draft` until real practices documented.

---

## 12. Future-product model

### `Product` (Stage D — schema reserved now)
```yaml
slug: string
name: string
tagline: string
productType: saas | api | toolkit | platform | research
status: ideation | private-beta | public | deprecated
pillarOwner: pillarId
docsUrl: url | null
marketingSummary: string
# Explicitly NOT a Service
```

**Routing:** `/products`, `/products/[slug]` implemented only when first product is real.  
**Boundary:** Products ≠ Services; Services may *implement* or *integrate* products later.

---

## 13. Public / internal data boundary

### Public (allowed on website)
- Company narrative, pillars, services, technology taxonomy  
- Published insights, public case studies (consented)  
- Public leadership profiles  
- Open jobs  
- Verified trust objects only  

### Internal (never on website or client bundles)
- Employee PII beyond public profile fields  
- Credentials, API keys, cloud accounts  
- Internal network diagrams with real IPs/hostnames  
- Customer confidential data, unpublished deals  
- Security control gaps, raw vuln data  
- Internal runbooks with secrets  
- Non-public architecture specifics that increase attack usefulness without buyer value  

### Enforcement (architecture)
- Separate `content/public/**` vs never-committed internal stores  
- CMS roles later: `public_publisher` cannot read HR fields  
- Build pipeline only bundles `visibility: public` + `status: published|placeholder`  
- Contact form payloads logged minimally; no unnecessary PII retention (privacy policy Stage B+)  

---

## 14. System architecture (Stage A)

### 14.1 Decision records

#### ADR-001 — Application framework
**Decision:** Next.js (App Router) + TypeScript.  
**Why:** SEO (SSR/SSG), route scalability, Server Actions for contact, strong DX, i18n-ready.  
**Reject:** SPA-only CSR (SEO/a11y cost); heavy custom SSR framework for v1.

#### ADR-002 — No database in v1
**Decision:** Filesystem content + optional email/API for contact.  
**Why:** Company platform growth is model-driven; DB/CMS when editorial volume or multi-editor demands it.  
**Evolve:** `ContentRepository` → CMS/DB without page rewrite.

#### ADR-003 — No public authentication in v1
**Decision:** Fully public site; no customer login.  
**Why:** No portal yet; auth surface increases risk without value.

#### ADR-004 — Hosting
**Decision:** Managed CDN/application host (e.g. Vercel, Cloudflare Pages + Workers, or AWS Amplify).  
**Reject for v1:** Kubernetes for marketing site (unjustified complexity).  
**Evolve:** Same containerizable Node app if org standardizes on K8s later.

#### ADR-005 — Styling
**Decision:** Design tokens from Phase 2 as CSS variables; one styling system (Tailwind **or** CSS Modules — pick one in Phase 4 bootstrap, prefer CSS variables + utility layer).  
**Align:** Precision Atelier light-first.

#### ADR-006 — Contact intake
**Decision:** Route Handler/Server Action → validate (Zod) → rate limit → honeypot → send via server-side email provider (Resend/SES/etc.).  
**Secrets:** env only.  
**Persist:** optional provider dashboard; no customer DB required.

#### ADR-007 — Analytics
**Decision:** Privacy-conscious analytics with consent where required; public site IDs only.  
**Events:** CTA clicks, contact success, service/pillar engagement, article depth (approximate).

### 14.2 Runtime diagram (Stage A)

```
User → DNS → CDN/WAF → Next.js app (SSG/SSR)
                         ├─ content/public (compile-time / on-demand)
                         └─ POST /api/contact → validator → rate limit → email provider
```

### 14.3 Health
- `GET /health` → `{ status: "ok" }` (no versions/secrets)  
- `GET /ready` → ok when app can render (and email config present if required for ready)

---

## 15. Security model

### 15.1 Website application
- Security headers: CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame-ancestors  
- Output encoding / React default escaping; sanitize MDX if ever allowing untrusted authors  
- Contact: schema validation, size limits, rate limiting, honeypot; CAPTCHA if abuse  
- No file uploads in v1 contact form  
- CORS default deny for APIs except known needs  
- Dependency lockfiles; CI: lint, typecheck, SAST, secret scan, dep scan  
- No secrets in repo or client bundles  

### 15.2 Supply chain
- Pin dependencies; generate SBOM in CI when feasible  
- Minimal production dependencies  

### 15.3 Organizational data
- Public content review before publish  
- Case studies require `client.consent`  
- Leadership publish checklist (PII minimization)  

### 15.4 Future CMS/admin (Stage B+)
- SSO + MFA for editors  
- RBAC by pillar  
- Audit log of publishes  
- Separate admin origin  

---

## 16. Scalability strategy

| Axis | Approach |
| --- | --- |
| **Content volume** | File → CMS adapter; pagination on Insights/Jobs |
| **Org growth** | Pillar/Person/Job models already multi-entity |
| **Services** | `/services/[slug]` dynamic |
| **Products** | Reserved entity + routes; separate apps later |
| **Locales** | next-intl-ready message files; English first |
| **Teams editing** | Stage B CMS RBAC |
| **Traffic** | CDN SSG; ISR for Insights if needed |
| **Infra** | Scale host vertically/edge; K8s only if company standard demands |

---

## 17. Content repository layout (Stage A proposal)

```
content/
  public/
    organization.yaml
    pillars/*.yaml
    services/*.mdx
    technology/*.yaml
    industries/*.mdx
    solutions/*.mdx
    case-studies/*.mdx
    insights/*.mdx
    jobs/*.mdx
    people/*.yaml          # only visibility:public files committed
    leadership-seats.yaml
    culture/*.mdx
    trust/*.yaml           # empty or absent until real
    pages/*.mdx            # about, engineering, security…
  README.md                # publishing rules + public/internal boundary
```

Internal people data: **out of repo** (future HR/CMS).

---

## 18. Observability & CI/CD (Stage A)

### Observability
- Host/platform logs + error tracking (e.g. Sentry) with PII scrubbing  
- Uptime check on `/` and `/health`  
- Alert on 5xx and contact pipeline failures  

### CI pipeline (required stages)
1 Checkout → 2 Install → 3 Format → 4 Lint → 5 Typecheck → 6 Unit → 7 Build → 8 SAST → 9 Dep scan → 10 Secret scan → 11 (SBOM) → 12 Deploy protected → 13 Smoke (`/`, `/health`)  

E2E (Playwright) on critical journeys before prod promote.

### Git
- `main` protected; PR + checks; conventional commits recommended; no secret commits.

---

## 19. Mapping pillars → initial services (ownership, not duplication)

| Pillar | Example commercial services (content later) |
| --- | --- |
| AI | Generative AI apps, RAG systems, AI agents, AI evaluation/security engagements |
| Engineering | Web/backend/API, SaaS platforms, modernization, mobile |
| Cloud | Architecture, migration, IaC, FinOps, cloud security engineering |
| Platform | CI/CD, Kubernetes platforms, GitOps, developer platforms, SRE retainers |
| Security | AppSec, DevSecOps programs, IAM/Zero Trust advisory, vuln management design |
| Data | Pipelines, platforms, streaming, analytics infrastructure |
| Labs | Research partnerships / exploratory spikes — **clearly labeled research** |

Technology taxonomy remains global and referenced by ID.

---

## 20. Trust architecture

### `TrustItem`
```yaml
id: string
type: certification | compliance | partnership | award | press | publication | customer_reference
title: string
issuer: string | null
url: string | null
evidenceAsset: path | null
verified: boolean             # must be true to display
visibility: public
```

`/trust` renders nothing inventable — empty state: “Credentials and partnerships will appear here when formally established.”

---

## 21. Master specification validation (updated)

| Spec theme | Result | Notes |
| --- | --- | --- |
| Company vs niche agency | **PASS** | Pillars + org model |
| Service architecture | **PASS** | Commercial services + pillar ownership |
| IA pages | **PASS** | Extended with pillars, leadership, trust, careers depth |
| Services ≠ Technology | **PASS** | Explicit separation |
| Case studies / Insights / Careers | **PASS** | Models defined |
| Contact security | **PASS** | ADR-006 |
| Design system / a11y / perf / SEO | **PASS** | Inherited Phase 2; impl later phases |
| Security / supply chain / CI | **PASS** | §15–18 |
| No fake trust | **PASS** | TrustItem.verified + placeholders |
| Future products / expansion | **PASS** | Product entity Stage D |
| No over-engineering | **PASS** | No K8s/DB/auth in v1 |
| People / multi-employee | **PASS** | Person + seats + public/internal boundary |
| Observability health | **PASS** | `/health` `/ready` |
| i18n readiness | **PASS** | Stated |
| Implementation started | **N/A** | Forbidden until gate pass |

**NEEDS REVIEW:** Exact managed host + email provider choice at Phase 4 bootstrap; nav label “Pillars” vs “Capabilities” (content tone).

---

## 22. Phase Quality Gate

### Completed
1. Updated IA  
2. Organizational content model  
3. People/leadership model  
4. Services model  
5. Technology capability model  
6. Industries model  
7. Solutions model  
8. Case-study model  
9. Insights model  
10. Careers/job model  
11. Future-product model  
12. Public/internal boundary  
13. System architecture + ADRs  
14. Security model  
15. Scalability / evolution strategy  
16. Master spec re-validation  

### Remaining
- Stakeholder approval of pillar URL scheme + nav wording  
- Real org data (locations, leaders, jobs) when available  
- Phase 4 implementation (only after approval)  

### Risks
- Pillar + Services + Technology triple surface can confuse → mitigated by definitions + hub copy  
- Empty leadership/careers may feel thin → honest placeholders > fiction  
- Premature CMS demand → resist until multi-editor pain is real  

### Assumptions
- Phase 2 Precision Atelier remains design system source  
- No real certifications/partners/products yet  
- English-only v1  
- Company will supply real people/jobs before public claims  

### Validation
- Cross-checked against master spec + company context update  
- Explicit anti-portfolio framing  
- No production code  

### Next phase
**PHASE 4 — IMPLEMENTATION** begins only after explicit approval: project foundation → design system → chrome → pages wired to `content/public` models.

---

## 23. Decision requested

1. Approve pillar routes `/pillars/*` and services grouped by pillar?  
2. Approve People model (public leadership placeholders; no invented names)?  
3. Approve Stage A stack: Next.js + TS + filesystem content + secured contact (no DB/K8s)?  
4. **Pass Phase 3 quality gate and authorize Phase 4?**
