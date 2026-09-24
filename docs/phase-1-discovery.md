# AVERO TECHNOLOGIES — PHASE 1: DISCOVERY

**Status:** COMPLETE (pending stakeholder validation)  
**Date:** 2026-09-16  
**Primary brand:** AVERO  
**Working domain assumption:** avero.com (not registered by this process)

---

## 1. Objective

Define requirements, audiences, journeys, information architecture, and non-functional/technical constraints so Phase 2 (Brand & UX) and Phase 3 (Architecture) can proceed without guesswork baked into production code.

**Positioning (locked):**  
A next-generation **technology engineering company** spanning AI, software, cloud, cybersecurity, automation, infrastructure, and emerging technologies — not a single-discipline agency.

**Core message direction:** *Engineering the Next.*

---

## 2. Target Audiences

| Priority | Audience | Primary jobs-to-be-done | Trust signals they need |
| --- | --- | --- | --- |
| P0 | CTOs / Engineering leaders | Evaluate capability depth; shortlist vendor | Architecture clarity, security posture, engineering process |
| P0 | CISOs / security leads | Assess secure-by-design & DevSecOps maturity | Honest security language, no fake certs |
| P0 | Startup founders / product leads | Find partner for build + operate | Clarity of services, engagement path, realistic scope |
| P1 | CIOs / enterprise buyers | Fit into procurement / risk narrative | Professional B2B contact, legal pages, privacy |
| P1 | Investors / partners | Brand seriousness & market narrative | Consistent identity, future expansion readiness |
| P2 | Candidates (engineers) | Decide whether to apply | Culture, stack honesty, real open roles only |
| P2 | Technical writers / SEO / AI search | Entity understanding | Structured data, clear service definitions |

**Out of scope for v1 conversion goals:** consumer marketing, e-commerce checkout, self-serve SaaS product UI.

---

## 3. Primary User Journeys

### J1 — Capability discovery → contact
1. Land on Home → understand what Avero is  
2. Scan capability map (AI → Software → Cloud → Platform → Security → Automation → Reliability → Data)  
3. Open relevant Services detail page  
4. Optional: Technology / Security / Engineering for depth  
5. CTA → Contact form → success state  

**Success:** Qualified inquiry submitted without friction or spam risk.

### J2 — Trust / security evaluation
1. Home or nav → Security / Engineering / About  
2. Read secure-by-design, DevSecOps, ops philosophy  
3. Contact with “security review / architecture engagement” intent  

### J3 — Insights / SEO entry
1. Land on Insights article via search  
2. Related services / internal links  
3. Subscribe or Contact (no fabricated newsletter metrics)

### J4 — Careers (optional traffic)
1. Careers → culture + stack → open roles (empty-state if none) → apply process description  

### J5 — Error recovery
1. Broken URL → 404 with nav + search/links → Home/Services  

---

## 4. Information Architecture

### 4.1 Primary navigation

| Label | Path | Purpose |
| --- | --- | --- |
| Home | `/` | Positioning + conversion |
| About | `/about` | Mission, philosophy, principles |
| Services | `/services` | Hub + links to detail pages |
| Industries | `/industries` | Adaptable sectors; no false experience claims |
| Solutions | `/solutions` | Problem-shaped offerings (template-ready) |
| Technology | `/technology` | Ecosystem by category (no fake partnerships) |
| Engineering | `/engineering` | Method: Discover → … → Evolve |
| Security | `/security` | First-class security narrative |
| Case Studies | `/case-studies` | Reusable structure; placeholders marked |
| Insights | `/insights` | Editorial / SEO |
| Careers | `/careers` | Culture + roles (honest empty states) |
| Contact | `/contact` | B2B inquiry |

### 4.2 Service detail URLs (scalable)

- `/services/ai`
- `/services/software-engineering`
- `/services/cloud`
- `/services/devops`
- `/services/devsecops`
- `/services/cybersecurity`
- `/services/platform-engineering`
- `/services/observability`
- `/services/data-engineering`
- `/services/automation`
- `/services/emerging-technologies`

**Rule:** New services = new content entry + route pattern `/services/[slug]`, not a site rewrite.

### 4.3 Supporting / legal / system

| Path | Notes |
| --- | --- |
| `/privacy` | Placeholder pending legal review |
| `/terms` | Placeholder pending legal review |
| `/cookies` | If consent required by jurisdiction |
| `/404`, app error boundaries | Professional, no stack traces |
| `/health`, `/ready` | Ops probes; no sensitive infra leakage |
| `/sitemap.xml`, `/robots.txt` | SEO |

### 4.4 Content model (structured, CMS-ready)

Entities (file-based MDX/JSON initially; CMS later):

- **Service** — slug, title, summary, capabilities[], outcomes[], relatedTech[], seo
- **Industry** — slug, description, useCases[] (no fake clients)
- **Solution** — problem, approach, relatedServices[]
- **CaseStudy** — problem, context, architecture, tech, challenges, security, implementation, results, lessons; `status: draft|published|placeholder`
- **Insight** — SEO fields, author, dates, category, tags, readingTime, body, OG
- **Job** — title, location, type, description; empty list allowed
- **Page** — static marketing pages with shared sections

---

## 5. Homepage Content Requirements (IA → UX)

Must answer: what / does what / for whom / why credible / next action.

| Section | Requirement |
| --- | --- |
| Hero | Headline + support; CTAs: **Start a Conversation**, **Explore Our Capabilities** |
| Capability visualization | AI → Software → Cloud → Platform → Security → Automation → Reliability → Data |
| What We Build | Platforms/systems types (not buzzword soup) |
| What We Secure | DevSecOps + security scope |
| What We Operate | Cloud, platform, SRE, observability, automation |
| Engineering Approach | Discover → Architect → Build → Secure → Deploy → Observe → Optimize → Evolve |
| Technology ecosystem | Categorized, not a giant logo wall |
| Industries | Adaptable; no unverified experience claims |
| Case studies | UI ready; placeholders clearly labeled |
| Insights | Editorial teaser |
| Final CTA | Complex problem → Talk to Avero |

---

## 6. Functional Requirements Checklist

### Site & content
- [ ] All primary pages listed in §4.1
- [ ] All service detail routes in §4.2
- [ ] Design system (tokens + reusable components)
- [ ] Responsive: mobile / tablet / laptop / desktop / ultrawide
- [ ] Dark-premium visual direction consistent with brand (Phase 2 will lock tokens)
- [ ] Structured Insights publishing metadata
- [ ] Case study template without fabricated results
- [ ] Careers with honest empty state for openings
- [ ] Contact form: name, work email, company, role, project type, optional budget, message
- [ ] Form success/error/loading states
- [ ] Legal page shells (privacy, terms, cookies)
- [ ] i18n-ready string architecture (English first)

### Trust / content integrity
- [ ] No fake clients, testimonials, awards, certs, stats, partnerships
- [ ] Emerging tech framed as **Research & Emerging Technologies** where not actively offered
- [ ] Placeholders explicitly marked

### Ops surfaces
- [ ] Health/ready endpoints (or hosting equivalent)
- [ ] Privacy-conscious analytics event plan (CTA, contact, engagement)
- [ ] Error pages 404 / 500

---

## 7. Non-Functional Requirements

| Area | Target |
| --- | --- |
| Accessibility | WCAG 2.2 AA |
| Performance | Excellent Core Web Vitals (measure before claiming) |
| SEO | Metadata, OG/Twitter, canonical, sitemap, robots, JSON-LD (Organization, WebSite, Breadcrumb, Article, Service) |
| GEO / AI search | Clear entity copy, structured definitions, consistent naming |
| Security | CSP, HSTS, secure headers, input validation, rate limit contact, no secrets in client |
| Supply chain | Lockfiles, pin deps, scanning in CI, SBOM where practical |
| Maintainability | Component system, content-driven pages, conventional commits / PR checks |
| Scalability | Add services/products without rebuild |
| Observability | Logs, errors, uptime, alerts in production plan |
| Motion | Subtle; honor `prefers-reduced-motion` |

---

## 8. Technical Requirements (decisions deferred to Phase 3 — candidates only)

**Evaluation criteria:** performance, maintainability, SEO, security, scalability, DX — not trendiness.

| Concern | Candidate approach (to validate in Phase 3) |
| --- | --- |
| Frontend | Next.js (App Router) + TypeScript — SSR/SSG for SEO |
| Styling | CSS modules or Tailwind with design tokens — one system only |
| Content | MDX / contentlayer-style or `content/*.md` — CMS adapter later |
| Contact API | Server Action or Edge/Route Handler + validation (Zod) + honeypot/rate limit; email via server-only provider |
| Database | **None for v1** unless CMS/auth requires it |
| Hosting | CDN-first (e.g. Vercel/Cloudflare/AWS Amplify) — K8s not required for brochure+forms |
| CI/CD | Lint, typecheck, unit, a11y, build, secret/deps scan, deploy protected env |
| Analytics | Privacy-friendly (plausible/umami/GA4 with consent) — no secrets in frontend beyond public IDs |
| i18n | `next-intl` or equivalent routing-ready structure |

**Explicit non-goals for v1:** customer portal, auth product, Kubernetes deployment of the marketing site, inventing product SaaS UIs.

---

## 9. Missing Information (blocker / non-blocker)

| Item | Impact | Status |
| --- | --- | --- |
| Legal entity name, address, jurisdiction | Footer, legal, schema | **Missing** — use placeholders |
| Real contact email / phone | Contact, schema | **Missing** — placeholder `hello@avero.com` pattern pending confirmation |
| Domain registration | Production | **Not assumed purchased** |
| Real case studies / clients | Case studies | **None** — placeholder architecture only |
| Real job openings | Careers | **None** — empty state |
| Certifications / partnerships | Trust badges | **None** — omit until verified |
| Brand assets (logo, exact fonts) | Visual system | **TBD Phase 2** — propose system |
| Preferred cloud / email provider | Infra | **TBD Phase 3** |
| Analytics vendor preference | Privacy | **TBD Phase 3** |
| Cookie consent jurisdiction | Legal UX | Assume EU-ready consent pattern unless told otherwise |

---

## 10. Assumptions

1. Greenfield repo; English-only launch.  
2. Marketing site + contact intake is v1; no transactional product backend.  
3. “Engineering the Next.” is approved creative north star; supporting copy may be refined.  
4. Industries/solutions describe *capability fit*, not proven vertical case history.  
5. Emerging technologies = research/exploratory framing unless later confirmed as offerings.  
6. B2B contact email delivery will use a server-side provider with secrets in env.  
7. Stakeholder will validate Phase 1–3 before production code is treated as final.  
8. Visual direction: premium, futuristic, technically credible — not neon/hacker/template agency.

---

## 11. Risks

| Risk | Mitigation |
| --- | --- |
| Spec scope is large; delivery sprawl | Phased gates; MVP page set first, then deepen |
| Empty trust signals feel thin | Strong engineering narrative + honest placeholders over fake social proof |
| Over-engineering infra (K8s for static site) | Match complexity to actual needs |
| Contact spam / abuse | Validation, rate limit, honeypot, CAPTCHA optional later |
| Legal pages incorrect | Explicit “for legal review” banners on placeholders |
| Performance vs motion | Motion budget; reduced-motion; measure CWV |
| Content volume delay | Ship IA + templates; fill Insights iteratively |

---

## 12. Requirements Checklist (acceptance for Phase 1 exit)

- [x] Company identity & positioning locked  
- [x] Audiences defined  
- [x] User journeys defined  
- [x] Full IA + URL architecture  
- [x] Service taxonomy mapped to routes  
- [x] Functional + non-functional requirements listed  
- [x] Missing info & assumptions explicit  
- [x] Tech candidates listed without premature lock-in  
- [x] Trust / anti-fabrication rules enforced  
- [ ] **Stakeholder sign-off** (required before Phase 4 code)

---

## 13. Phase Quality Gate

### Completed
- Discovery document authored  
- Audiences, journeys, IA, FR/NFR, risks, assumptions, gaps  
- Empty workspace confirmed (greenfield)

### Remaining
- Stakeholder validation of IA labels, CTAs, and contact fields  
- Confirmation of legal entity + real contact channels  
- Phase 2 Brand & UX artifacts  
- Phase 3 Architecture decision record (ADR)

### Risks
- See §11  

### Assumptions
- See §10  

### Validation
- Cross-checked against master specification §§1–45 for coverage of pages, services, security/trust rules, and phased process  
- No production code written (per START instruction)

### Next phase
**PHASE 2 — Brand & UX:** visual direction, design principles, typography, color tokens, component philosophy, navigation model, homepage wireframe, page hierarchy — still **no production implementation**.

---

## 14. Decision Requested From Stakeholder

Please confirm or correct:

1. Primary nav labels and paths (§4.1)  
2. Service slug list (§4.2)  
3. Contact form fields (budget optional = yes/no)  
4. Temporary placeholders OK for legal/contact until real data provided?  
5. Proceed to Phase 2 Brand & UX?
