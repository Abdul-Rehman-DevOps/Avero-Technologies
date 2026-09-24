# AVERO TECHNOLOGIES — PHASE 2: BRAND & UX

**Status:** COMPLETE (pending stakeholder validation)  
**Date:** 2026-09-16  
**Depends on:** `docs/phase-1-discovery.md` (approved)  
**Constraint:** No production code in this phase

---

## 0. Design challenge (what we refuse)

Blindly accepting “serious tech = dark mode + cyan glow + purple gradients + pill tags + card grids” produces the opposite of credibility: it looks like a template marketplace theme.

| Weak default | Why it fails | Avero decision |
| --- | --- | --- |
| Near-black canvas + neon accents | Overused; glow reads “gaming/hacker”; hurts long-form Insights readability | **Light-first Precision Atelier**; optional future dark theme only after light system is proven |
| Purple / indigo SaaS gradients | AI-design cluster look; conflicts with brand rules | **No purple family in brand palette** |
| Circuit boards, binary rain, padlocks | Cheap metaphor; insults technical buyers | Abstract **structure**: grids, axes, orbital nodes — never clip-art security |
| Hero as dashboard of stats/badges | Clutter; fake metrics temptation | Hero = **brand + one claim + one sentence + two CTAs + atmosphere** only |
| Cards for every section | Template agency smell | Cards **only** where interaction or selection requires a container |
| Giant logo walls | Noise without partnership proof | Categorized tech **names/text**, sparse marks, no fake partner claims |
| Rounded-full pill cluster tags | Visual junk | Small square/soft-rect meta labels; rare use |
| Excessive scroll animations | Performance + a11y risk | **2–3 intentional motion systems** site-wide max |
| Inter / Roboto / system UI | Generic | Distinctive display + engineering body + mono |

**Creative north star:** *Engineering the Next.*  
**Brand feeling:** precise, calm, intelligent, scalable — like a lab that ships production systems.

---

## 1. Brand strategy

### 1.1 Brand pyramid

| Layer | Definition |
| --- | --- |
| **Essence** | Engineering the next generation of digital systems |
| **Promise** | We help organizations **build, secure, automate, operate, and evolve** modern technology — with engineering depth, not brochure buzzwords |
| **Positioning** | Technology **engineering** company (multi-domain), not a single-niche agency |
| **Personality** | Precise · Credible · Forward · Restrained · Direct |
| **Voice** | Technical clarity first. Short sentences. Concrete verbs. No “transform your business with innovative solutions.” |
| **Anti-voice** | Hype, fake authority, juvenile startup slang, fear-mongering security copy |

### 1.2 Naming & lockups

- **Legal / full:** AVERO TECHNOLOGIES  
- **Primary brand:** AVERO  
- **Spoken:** “Vex-kel-is” (document for later audio/brand guide; not invented mythology)  
- **Lockups:**  
  - Wordmark only (preferred in nav and hero)  
  - Wordmark + “TECHNOLOGIES” (small caps / tracking) for formal contexts  
- **Do not** invent a fake Latin etymology story. If origin is undefined, say nothing.

### 1.3 Messaging architecture

| Slot | Copy direction |
| --- | --- |
| **Primary** | Engineering the Next. |
| **Support** | AI, software, cloud, security, platforms, and automation — engineered as systems, not isolated services. |
| **Audience bridge** | Built for technical decision-makers who evaluate architecture, security, and operational reality. |
| **CTA primary** | Start a Conversation |
| **CTA secondary** | Explore Our Capabilities |
| **Closing CTA** | Have a complex technology problem? Let’s engineer the path forward. → **Talk to Avero** |

### 1.4 Trust strategy (honest)

Credibility comes from: method clarity, security-first narrative, precise service definitions, structured content, and empty states that refuse fabrication.  
**Never** use invented logos of clients, fake “Trusted by”, fake cert rows, or fake metrics in the UI kit.

---

## 2. Visual identity

### 2.1 Concept name: **Precision Atelier**

A light, architectural interface with deep ink typography, one signal accent, and a subtle technical field (grid / soft mesh) that suggests systems without illustrating clichés.

**Hero visual plane (homepage):** full-bleed atmospheric field — cool mist → chalk white with a low-contrast structural grid and a single soft radial “instrument glow” (accent at ≤8% opacity). Brand wordmark is hero-level. **No** inset media card, **no** floating badges, **no** stats strip in first viewport.

**Photography / illustration policy:** Prefer abstract structural graphics and diagrams. Avoid stock “handshake,” “laptop with code,” “diverse team smiling.” Architecture diagrams allowed on Engineering / Case Studies.

### 2.2 Logo construction (spec for Phase 4)

- Wordmark: **AVERO** in display font, tracking slightly open (+2% to +4%)  
- Optional monogram: geometric **V** constructed from two precision strokes + a cut aperture (not a shield, not a lock)  
- Clear space: ≥ 0.5× cap-height on all sides  
- Minimum digital width: 112px wordmark  
- Do not place logo on busy photographic crops; use solid or approved field only

### 2.3 Iconography

- 1.5px stroke, 24px optical grid, rounded joins 1.5–2px (not bubbly)  
- Monochrome ink; accent only for active/selected  
- No emoji in product UI  
- Service icons: abstract (node, layer, signal) — not mascots

### 2.4 Imagery & diagram language

- Diagrams: 1px rules, labeled nodes, monospace annotations  
- Avoid 3D chrome shapes and particle explosions  
- Case study architecture: top-down or layered stack diagrams with clear legends

---

## 3. Design principles

1. **Brand first** — If the nav were removed, the first viewport must still read as Avero.  
2. **One job per section** — One headline, one supporting sentence, one primary action.  
3. **Restraint is authority** — Whitespace and hierarchy beat decoration.  
4. **Systems over services lists** — Show how domains connect; don’t dump buzzwords.  
5. **Honest UI** — Placeholders labeled; no fake social proof components.  
6. **Structure visible** — Grids, rules, and process convey engineering.  
7. **Interaction earns a card** — Otherwise prefer open layout.  
8. **Motion serves hierarchy** — Never entertainment.  
9. **Accessible by default** — Contrast, focus, semantics are design requirements.  
10. **Performance is part of the brand** — Heavy effects that hurt LCP are brand failures.

---

## 4. Typography

### 4.1 Font stack (expressive + engineering)

| Role | Family | Rationale |
| --- | --- | --- |
| **Display / brand** | **Syne** (600–800) | Geometric, contemporary, non-generic; strong wordmark presence |
| **UI / body** | **IBM Plex Sans** (400–600) | Engineering-credible, excellent readability, multilingual-ready |
| **Mono / meta** | **IBM Plex Mono** (400–500) | Labels, code, process steps, diagram annotations |

**Fallbacks:** `Syne, "Arial Narrow", sans-serif` / `IBM Plex Sans, "Segoe UI", sans-serif` / `IBM Plex Mono, ui-monospace, monospace`

**Rejected:** Inter, Roboto, Arial as primary, Space Grotesk-as-everywhere (overused “startup tech”), decorative scripts.

### 4.2 Type scale (desktop rem base 16px)

| Token | Size | Line | Use |
| --- | --- | --- | --- |
| `display-xl` | 64 / 72 | 1.05 | Home hero brand-adjacent headline |
| `display-lg` | 48 / 56 | 1.1 | Page heroes |
| `display-md` | 36 / 40 | 1.15 | Section titles |
| `title-lg` | 28 | 1.25 | Subsection |
| `title-md` | 22 | 1.3 | Card/interactive titles |
| `body-lg` | 18 | 1.6 | Lead paragraphs |
| `body-md` | 16 | 1.6 | Default |
| `body-sm` | 14 | 1.5 | Secondary |
| `label` | 12 | 1.4 | Mono uppercase / tracking 0.06em for meta |
| `code` | 13–14 | 1.5 | Inline/code blocks |

**Mobile:** step display sizes down ~1 tier (`display-xl` → 40–44px). Never shrink entire desktop layout uniformly.

### 4.3 Typographic rules

- Headlines: Syne; max ~3 lines on desktop hero  
- Body measure: 60–72ch for Insights articles  
- Avoid all-caps for long phrases; reserve for mono labels  
- H1 once per page; logical H2/H3 hierarchy for SEO + a11y

---

## 5. Color system

### 5.1 Brand palette (light-first)

| Token | Hex | Role |
| --- | --- | --- |
| `ink-950` | `#0B1220` | Primary text, wordmark |
| `ink-800` | `#1C2738` | Secondary headings |
| `ink-600` | `#3D4B63` | Body secondary |
| `ink-400` | `#7A879C` | Meta, placeholders |
| `chalk-50` | `#F7F9FC` | Page background |
| `chalk-100` | `#EEF2F7` | Subtle section shift |
| `chalk-200` | `#E2E8F0` | Rules, borders |
| `paper` | `#FFFFFF` | Elevated interactive surfaces only when needed |
| `signal` | `#0F6E56` | Primary accent (deep teal — decisive, not neon) |
| `signal-hover` | `#0B5A46` | Hover/active |
| `signal-subtle` | `#E6F4EF` | Soft fills, selected states |
| `arc` | `#1F4B99` | Secondary accent for diagrams / links differentiation (cool cobalt, **not purple**) |
| `warning` | `#9A6700` | Form warnings |
| `danger` | `#B42318` | Errors |
| `success` | `#0F6E56` | Align with signal for success |

**Atmosphere (hero):** radial gradient from `signal` at 6–8% opacity + cool gray mesh; optional 1px grid at `ink-950` 4% opacity.

**Rejected accents:** `#7C3AED` purple, electric `#00F0FF` neon, terracotta/cream “editorial startup” combo.

### 5.2 Semantic mapping

- Text primary → `ink-950` on `chalk-50` (contrast ≥ 12:1)  
- Text secondary → `ink-600` on `chalk-50` (≥ 4.5:1)  
- Interactive primary → `signal` fills with white text (≥ 4.5:1)  
- Focus ring → `arc` 2px + offset on light surfaces  
- Do not rely on color alone for state (pair with icon/text)

### 5.3 Dark theme

**Deferred.** Spec bias + Insights readability favor light-first. If introduced later: invert surfaces carefully; do not merely invert hex values; re-validate contrast and glow bans.

---

## 6. Design tokens

### 6.1 Spacing (4px base)

`0, 1=4, 2=8, 3=12, 4=16, 5=24, 6=32, 7=48, 8=64, 9=96, 10=128`

Section vertical rhythm desktop: `96–128px`; mobile: `64–80px`.

### 6.2 Layout

| Token | Value |
| --- | --- |
| `container-sm` | 680px (article) |
| `container-md` | 960px |
| `container-lg` | 1200px |
| `container-xl` | 1400px |
| `gutter` | 24px (mobile 16px) |
| `grid-columns` | 12 |
| `grid-gap` | 24px |

### 6.3 Radius

| Token | Value | Use |
| --- | --- | --- |
| `radius-none` | 0 | Rules, diagrams |
| `radius-sm` | 4px | Inputs, meta |
| `radius-md` | 8px | Buttons, interactive panels |
| `radius-lg` | 12px | Rare large interactive only |

**Ban:** `rounded-full` pills as default chip style.

### 6.4 Elevation

Prefer **border + surface shift** over multi-layer shadows.

| Token | Value |
| --- | --- |
| `shadow-none` | none |
| `shadow-sm` | `0 1px 2px rgba(11,18,32,0.06)` |
| `shadow-md` | `0 8px 24px rgba(11,18,32,0.08)` — hover only on interactive |

### 6.5 Motion tokens

| Token | Value |
| --- | --- |
| `duration-fast` | 120ms |
| `duration-base` | 200ms |
| `duration-slow` | 400ms |
| `ease-standard` | cubic-bezier(0.2, 0.8, 0.2, 1) |
| `ease-emphasized` | cubic-bezier(0.16, 1, 0.3, 1) |

### 6.6 Z-index scale

`base 0` · `dropdown 20` · `sticky 30` · `overlay 40` · `modal 50` · `toast 60`

### 6.7 Breakpoints

| Name | Min width |
| --- | --- |
| `sm` | 480px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |
| `uw` | 1920px (ultrawide: widen container, do not stretch type endlessly) |

---

## 7. Component philosophy

### 7.1 Principles

- **Compose from primitives** — Button, Link, Text, Input, Field, Stack, Cluster, Rule, Container, Section  
- **Variant via tokens**, not one-off CSS  
- **Cards are not a layout strategy** — use `Section` + grid + `Rule` separators  
- **Interactive collections** (job list, case study picker, form) may use bordered surfaces  
- **Empty states are designed** — Case Studies / Careers with no data show honest placeholders  
- **No decorative badge components** for fake certs/awards

### 7.2 Core component inventory (design contracts)

| Component | Notes |
| --- | --- |
| `Button` | primary (signal), secondary (ink outline), tertiary (text), sizes sm/md; min height 44px touch |
| `Link` | inline + standout; focus visible |
| `Nav` / `MobileNav` | see §8 |
| `Field` / `Input` / `Textarea` / `Select` | labels always visible; errors linked via `aria-describedby` |
| `Alert` | info/success/warning/danger — icon + text |
| `Badge` | rare; soft-rect; not for marketing fluff |
| `Tabs` / `Accordion` | keyboard complete |
| `Table` | Insights admin later; readable zebra optional via subtle chalk |
| `CodeBlock` | mono, copy control optional |
| `Breadcrumbs` | with schema later |
| `Footer` | compact; legal links; no fake social proof |
| `ProcessRail` | Engineering approach steps |
| `CapabilityMap` | ecosystem visualization (custom, not card grid) |
| `TechTaxonomy` | categorized lists |
| `ArticleMeta` | date, read time, category |
| `CTABand` | closing conversion section |
| `PlaceholderNotice` | explicit “Placeholder — content pending” |

### 7.3 Form UX (Contact)

- Single column, max width ~560px  
- Work email validated client + server (Phase 3+)  
- Budget optional, clearly labeled  
- Spam affordances are invisible (honeypot) — no UX friction beyond optional future CAPTCHA if abuse appears  
- Success: calm confirmation, no confetti

---

## 8. Navigation UX

### 8.1 Desktop (≥1024px)

- Sticky top bar: chalk/blur subtle, 1px bottom rule  
- Left: wordmark  
- Center/right: primary links (About, Services [dropdown], Industries, Solutions, Technology, Engineering, Security, Case Studies, Insights, Careers)  
- Far right: **Start a Conversation** as primary button  
- **Challenge:** 11 destinations is heavy. Mitigation:  
  - Group under **Capabilities** mega-pattern: Services + Technology + Engineering + Security  
  - Keep About, Insights, Careers, Contact accessible  
  - **Recommended IA presentation for UX (nav):**  

**Primary visible:** Services · Solutions · Security · Insights · About · Contact CTA  
**Secondary (grouped “Platform” or “Company”):** Technology, Engineering, Industries, Case Studies, Careers  

This does **not** remove Phase 1 routes; it reduces cognitive load. Full map remains in footer.

### 8.2 Services dropdown

- Two-column panel: service names + one-line descriptors  
- Footer link: “View all services”  
- Keyboard: Esc closes; focus trap not required for non-modal disclosure if focus order is logical

### 8.3 Mobile

- Wordmark + menu button (44×44)  
- Full-screen or 100vh sheet with stacked links, large tap targets  
- CTA pinned at bottom of sheet  
- No hover-only affordances

### 8.4 Breadcrumbs

On service, insight, case study detail pages — under hero or below nav.

---

## 9. Responsive behavior

| Viewport | Behavior |
| --- | --- |
| Mobile | Single column; CapabilityMap becomes vertical flow or horizontal scroll with snap (prefer vertical for a11y); nav sheet |
| Tablet | 2-column where lists benefit; hero type mid-scale |
| Desktop | 12-col; CapabilityMap as connected horizontal/flow diagram |
| Ultrawide | Cap content at `container-xl`; atmosphere may full-bleed; do not stretch paragraphs beyond measure |

**Touch:** spacing ≥ 8px between targets; primary controls ≥ 44×44.

---

## 10. Motion principles

**Site-wide intentional motions (max 3 systems):**

1. **Enter-reveal** — section headings/supporting text fade-up 12–16px, 400ms, once per section, interrupted by `prefers-reduced-motion: reduce` (instant opacity)  
2. **CapabilityMap draw** — stroke/opacity sequence showing domain connections (disabled under reduced motion → static diagram)  
3. **Interactive feedback** — button/link hover and focus transitions 120–200ms  

**Forbidden as default:** parallax hero overload, cursor-following blobs, autoplaying video backgrounds, infinite particle fields.

---

## 11. Accessibility principles (WCAG 2.2 AA)

- Semantic HTML landmarks: `header`, `nav`, `main`, `aside`, `footer`  
- Skip link to `#main`  
- Visible focus rings (never `outline: none` without replacement)  
- Color contrast AA for text and essential UI  
- Forms: visible labels, error text, do not use placeholder as label  
- Prefer native controls; ARIA only when necessary  
- Respect `prefers-reduced-motion`  
- Alt text for meaningful images; empty alt for decorative  
- Heading order without skips  
- Target size ≥ 24px CSS (prefer 44px for primary)  
- Do not convey state by color alone  

---

## 12. Homepage wireframe

```
┌──────────────────────────────────────────────────────────────┐
│ [Skip to content]                                            │
│ NAV: Wordmark · (grouped links) · [Start a Conversation]     │
├──────────────────────────────────────────────────────────────┤
│ HERO (full-bleed atmosphere · first viewport · one composition│
│                                                              │
│   AVERO                          ← brand as hero signal   │
│   Engineering the Next.             ← one headline           │
│   One supporting sentence…          ← short                  │
│   [Start a Conversation] [Explore Our Capabilities]          │
│                                                              │
│   (no stats · no badges · no cards · no overlay chips)       │
├──────────────────────────────────────────────────────────────┤
│ CAPABILITY MAP                                               │
│   AI → Software → Cloud → Platform → Security →              │
│   Automation → Reliability → Data                            │
│   (sophisticated diagram · one job: show ecosystem)          │
├──────────────────────────────────────────────────────────────┤
│ WHAT WE BUILD                                                │
│   H2 + sentence                                              │
│   Open list / linked tiles (NOT marketing card farm)         │
├──────────────────────────────────────────────────────────────┤
│ WHAT WE SECURE                                               │
│   H2 + sentence · security themes                            │
├──────────────────────────────────────────────────────────────┤
│ WHAT WE OPERATE                                              │
│   H2 + sentence · cloud / platform / SRE / observability     │
├──────────────────────────────────────────────────────────────┤
│ ENGINEERING APPROACH                                         │
│   ProcessRail: Discover→Architect→Build→Secure→              │
│   Deploy→Observe→Optimize→Evolve                             │
├──────────────────────────────────────────────────────────────┤
│ TECHNOLOGY ECOSYSTEM                                         │
│   Categorized text taxonomy (Cloud, Containers, …)           │
├──────────────────────────────────────────────────────────────┤
│ INDUSTRIES                                                   │
│   Capability fit · no false “we’ve shipped X for Y” claims   │
├──────────────────────────────────────────────────────────────┤
│ CASE STUDIES                                                 │
│   Grid ready · PlaceholderNotice if empty                    │
├──────────────────────────────────────────────────────────────┤
│ INSIGHTS                                                     │
│   3 editorial teasers max                                    │
├──────────────────────────────────────────────────────────────┤
│ CTA BAND                                                     │
│   Complex problem? → Talk to Avero                        │
├──────────────────────────────────────────────────────────────┤
│ FOOTER · full sitemap · legal · contact placeholders         │
└──────────────────────────────────────────────────────────────┘
```

**First viewport brand test:** Remove nav → still unmistakably Avero via wordmark scale + headline + atmosphere.

---

## 13. Page hierarchy & layout patterns

| Page | Hero pattern | Body pattern |
| --- | --- | --- |
| Home | Brand-led full-bleed | Sections per §12 |
| About | Title + philosophy lead | Mission/vision/philosophies as sequential sections with rules |
| Services hub | Title + map | Linked service index |
| Service detail | Service name + definition | Capabilities, approach, related tech, CTA |
| Industries | Title | Industry sections; disclaimer of non-claimed delivery history |
| Solutions | Title | Problem → approach → related services |
| Technology | Title | Taxonomy by category |
| Engineering | Title | Process + principles + diagram |
| Security | Title | Secure-by-design pillars |
| Case Studies index | Title | List/grid + empty state |
| Case Study detail | Title | Problem…Lessons template |
| Insights index | Title | Filterable list (category) |
| Article | Title + meta | Long-form container-sm |
| Careers | Title | Culture + stack + openings (empty ok) |
| Contact | Title | Form + trust copy |
| Legal | Title | Prose + “pending legal review” notice |

**Shared chrome:** Nav, Footer, Skip link, CTA band (optional on legal).

---

## 14. Design rationale (summary)

1. **Light-first Precision Atelier** differentiates from dark-neon agency templates and aligns with accessibility and Insights reading.  
2. **Syne + IBM Plex** balances distinctive brand with engineering seriousness.  
3. **Deep teal `signal`** avoids purple/neon clusters while remaining decisive for CTAs.  
4. **Nav compression** challenges the weak idea that every IA node must be a top-level link; footer + grouped nav preserve findability.  
5. **CapabilityMap + ProcessRail** carry “systems company” meaning better than icon-card grids.  
6. **Honest empty states** are a brand feature for a new company without fabricated proof.  
7. **Motion budget** protects performance and WCAG.  

---

## 15. Validation against master specification

| Spec area | Status | Notes |
| --- | --- | --- |
| §2 Brand direction | **PASS** | Premium, technical, anti-cliché rules applied |
| §3 Core message | **PASS** | Engineering the Next. + CTAs |
| §5–14 Page set | **PASS** | Hierarchy covers all primary + supporting patterns |
| §6 Homepage structure | **PASS** | All required sections wireframed |
| §15 Design system | **PASS** | Tokens, components, breakpoints defined |
| §16 Responsive | **PASS** | Explicit behaviors |
| §17 Accessibility | **PASS** | WCAG 2.2 AA principles |
| §18 Performance | **PASS** (design) | Motion/image policy; measurement = Phase 6 |
| §19–20 SEO/GEO | **PASS** (content structure) | Hierarchy/headings; impl. Phase 3–7 |
| §34 Trust | **PASS** | Anti-fabrication in UI kit |
| §35 Animations | **PASS** | 3 systems + reduced motion |
| §36–37 Visual/content quality | **PASS** | Principles + voice |
| §38 i18n | **PASS** | Copy architecture assumes externalizable strings |
| User design rules (no purple/cream/dark-default/pills/cards-in-hero) | **PASS** | Explicitly challenged and rejected |
| Production code | **N/A** | None written |

**NEEDS REVIEW (stakeholder):** Nav compression grouping vs flat Phase 1 list — recommend grouped primary nav.

---

## 16. Phase Quality Gate

### Completed
- Brand strategy, voice, messaging  
- Visual identity concept + logo/icon rules  
- Typography, color, full token set  
- Component philosophy + inventory  
- Navigation UX (incl. challenge to flat mega-nav)  
- Responsive + motion + a11y principles  
- Homepage wireframe + page hierarchy  
- Design rationale + master-spec validation  

### Remaining
- Stakeholder approval of: light-first direction, teal accent, Syne/Plex pairing, nav grouping  
- Logo SVG production (Phase 4)  
- High-fidelity mockups optional (not blocking Phase 3 if this doc is accepted)  
- Phase 3 Architecture ADR  

### Risks
- Light-first may feel “less futuristic” to some stakeholders → mitigated by atmosphere grid + CapabilityMap sophistication  
- Compressed nav may hide Engineering/Technology → mitigated by footer + Services adjacency + in-page links  
- Syne availability via font CDN licensing must be verified at implementation  

### Assumptions
- Phase 1 IA routes remain canonical even if nav labels group them  
- No real photography assets yet  
- Dark mode deferred  

### Validation
- Crosswalk to master spec §2–§38 and Phase 1 IA  
- Explicit rejection of weak tech-template patterns  
- No production code  

### Next phase
**PHASE 3 — ARCHITECTURE:** frontend, content, API (contact), security headers, deployment, observability, CI/CD decisions — documented ADRs — **still before broad UI implementation** (foundation code only after Phase 3 approval per original process: Phase 4 is Implementation).

---

## 17. Decision requested

1. Approve **Precision Atelier** (light-first, deep teal signal, Syne + IBM Plex)?  
2. Approve **grouped primary nav** with full IA in footer?  
3. Proceed to **Phase 3 — Architecture**?
