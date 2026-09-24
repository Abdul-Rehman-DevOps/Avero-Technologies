# AVERO — PHASE 5 DESIGN REVIEW

**Status:** COMPLETE — awaiting stakeholder authorization to implement  
**Date:** 2026-09-16  
**Constraint:** Design review only. No implementation in this document’s approval gate.  
**Preserved foundation:** Routes, ContentRepository, security headers, contact API, SEO, content models, brand tokens (Syne / Plex / chalk / ink / teal / cobalt)

---

## 1. Current design problems

| Problem | Where it shows up | Buyer effect |
| --- | --- | --- |
| **Empty-first-viewport** | Hero is left-aligned text on a faint full-bleed grid; right side is unused | Feels unfinished, not art-directed |
| **Brand/message collision** | `AVERO` display-large + `Engineering the Next.` also display-large | Redundant hierarchy; neither wins |
| **Wallpaper grid** | `.hero-atmosphere` grid on hero (and implied “tech” substrate everywhere) | Template SaaS signal |
| **Generic SaaS nav** | Flat link row + one weak dropdown + rounded CTA | Interchangeable with any agency |
| **Card / chip farming** | Capability chips → capability cards → bordered lists → process cards | Assembled, not authored |
| **Weak systems story** | Ecosystem is a horizontal chip chain with arrows | Does not feel like an engineering system |
| **Static document scroll** | Identical `Section` / `Heading` / `Lead` rhythm | No narrative cadence |
| **Generic buttons** | Soft fill / outline rectangles | No brand signature |
| **Insufficient depth** | Flat chalk surfaces, uniform borders | Low craft / low atelier |
| **CTA band as afterthought** | Dark band + default button | Conversion without presence |
| **No proprietary visual artifact** | No owned diagram, mark geometry, or schematic language | Not memorable; logo-removable → still generic |
| **Mobile = stack** | Desktop composition collapses without a designed mobile story | Compressed, not redesigned |

**Brutal test (current):** If the wordmark is removed, the homepage still looks like a light SaaS starter template. **FAIL.**

---

## 2. Root causes

1. **Phase 2 “Precision Atelier” was under-interpreted in Phase 4** as “white + Syne + grid + restraint,” not as craft + systems geometry + editorial composition.  
2. **Anti-cliché rules were applied as subtraction only** (no neon, no cards in hero, no fake proof) without adding a positive visual signature.  
3. **Component convenience drove layout** (`Section` → `Heading` → `Lead` → grid of borders) instead of section-specific compositions.  
4. **Hero budget from Phase 2 was followed too literally** (brand + headline + line + CTAs) without a dominant visual plane on the opposite side.  
5. **Capability storytelling was reduced to taxonomy UI** (lists and cards) instead of a single system artifact.  
6. **Motion was deferred to near-zero**, so the product of restraint became lifelessness.  
7. **Information density was confused with honesty** — refusing fake metrics left voids that should have been filled with *visual* information, not invented claims.

---

## 3. New visual strategy

### Name of the system
**AVERO System Schematic** (working title: **“Schematic Atelier”**)

### Thesis
Avero is communicated as an **authored engineering schematic**: precise geometry, annotated relationships, editorial typography, and controlled signal color — never a logo wall, never a neon network graph.

### Dual nature (Precision + Atelier)

| PRECISION | ATELIER |
| --- | --- |
| Modular domains, measurable hierarchy, mono annotations, clear axes | Crafted asymmetry, intentional crop, material surfaces, editorial pacing |
| Topology of capabilities as one system | Human-composed frames, not auto-generated node clouds |
| Technical labels (`SYS / 01`, coordinates) | White space as framing, not leftover |

### Signature elements (proprietary, reusable)

1. **System Frame** — thin ink rules forming an incomplete rectangle / aperture (cropped engineering drawing border).  
2. **Node–Path Language** — 1px cobalt/ink paths + soft teal “active” nodes; max 7 primary nodes (capabilities).  
3. **Annotation Layer** — IBM Plex Mono labels (`AI`, `SEC`, `PLT`) offset from geometry, never overlapping text body.  
4. **Signal Mark** — small teal vertical bar / index marker preceding section indices (`01`–`13`).  
5. **Directional CTA** — primary control with an em-dash arrow `→` as part of the control chrome, not an emoji.  
6. **Selective substrate** — schematic grid only inside System Frames / diagram panels; most sections stay clean chalk.

### Explicitly rejected again
Purple, neon, glassmorphism, particle fields, 3D chrome, logo farms, fake stats, motivational verbs, full-page wallpaper grids, card grids as default.

---

## 4. New homepage composition

Narrative sequence (authored scroll):

| # | Section | Composition type | Job |
| --- | --- | --- | --- |
| 01 | **Hero** | Asymmetric 12-col: copy 5 / schematic 7 | Who / what / why / next action + proprietary visual |
| 02 | **Engineering thesis** | Editorial split: large pull quote + mono statement | “Systems, not service menus” |
| 03 | **Capability system** | Interactive System Schematic (not 7 cards) | Connected domains |
| 04 | **What we build** | Asymmetric list + annotated plane | Outcomes as systems |
| 05 | **What we secure** | Layered security stack diagram + short copy | Security as practice |
| 06 | **What we operate** | Horizontal ops rail / timeline | Operate & reliability |
| 07 | **Technology ecosystem** | Taxonomy columns inside System Frame | Tools without logo wall |
| 08 | **Engineering methodology** | Process spine (Discover→Evolve) as schematic path | Method |
| 09 | **Industries / problems** | Compact linked index (not marketing cards) | Fit without false claims |
| 10 | **Selected work** | Honest empty / placeholder frame | Work architecture ready |
| 11 | **Insights** | Editorial list (title-led) | Thought leadership |
| 12 | **Company** | Compact strip: About / Leadership / Careers | Multi-team company signal |
| 13 | **Final conversion** | Full-bleed ink panel with System Frame corner marks | Talk to Avero |
| 14 | **Footer** | Structured sitemap, denser than Phase 4 | Wayfinding |

### Hero wireframe (desktop)

```
┌─ System Frame (subtle corner ticks) ─────────────────────────────┐
│ NAV …                                                            │
│                                                                  │
│  [AVR]  AVERO TECHNOLOGIES          ┌─ Schematic Panel ─────┐ │
│  mono meta: ENGINEERING COMPANY        │                       │ │
│                                        │   proprietary SVG     │ │
│  ENGINEERING                           │   AI─ENG─CLD─PLT      │ │
│  THE NEXT.                             │      \  |  /          │ │
│                                        │       SEC·DATA        │ │
│  One precise supporting paragraph.     │   Labs as research    │ │
│                                        │   node (dashed)       │ │
│  [ Start a Conversation → ]            │                       │ │
│  [ Explore Capabilities → ]            └───────────────────────┘ │
│                                                                  │
│  mono footer line: BUILD · SECURE · AUTOMATE · OPERATE · EVOLVE  │
└──────────────────────────────────────────────────────────────────┘
```

### Hero hierarchy rules
- Brand lockup: **small** (wordmark + TECHNOLOGIES), not competing with H1.  
- H1: `ENGINEERING` / `THE NEXT.` — intentional break, controlled tracking, not max viewport type for vanity.  
- Visual panel carries density; text column stays lean.

---

## 5. Navigation redesign

### Desktop IA (compressed, enterprise)

| Top-level | Panel content |
| --- | --- |
| **Capabilities** | 7 domains + one-line mandate each + link to `/capabilities` |
| **Services** | Grouped by capability (short commercial list) + `/services` |
| **Solutions** | Link index (no mega fluff) |
| **Technology** | Direct |
| **Company** | About, Leadership, People, Careers, Security, Trust |
| CTA | `Start a Conversation →` |

**Insights** moves under Company panel or footer-primary + secondary top if space; prefer **Company** panel + footer to avoid 7 top items.

### Interaction
- Hover **or** click to open (click for touch/keyboard).  
- Esc closes; focus trap not required if non-modal disclosure with logical tab order.  
- Panels: 2-column max, System Frame border, mono section labels — **not** a giant mega-menu.

### Mobile
- Full-height sheet with accordion groups matching top-level.  
- Sticky CTA at sheet bottom.  
- No hover dependency.

---

## 6. Capability visualization concept

### Artifact: **Capability Orthograph**
A 2D orthographic “system plate”:
- Center: `AVERO` aperture / core node (`CORE`)
- Orbiting domains on a shared bus/path: AI, Engineering, Cloud, Platform, Security, Data
- Labs as a **dashed research spur** (visually distinct from commercial-active nodes)

### Interaction model
- Each domain is a `<button>` / focusable control in a `tablist` or radiogroup pattern.  
- Selection updates an adjacent **detail dock**: name, mandate, capability bullets, related services links.  
- Hover is enhancement only; keyboard and touch use selection.  
- Reduced motion: static plate; selection still swaps dock content (no path drawing).

### Mobile
- Vertical **indexed selector** (01–07) + detail panel below — not a shrunk orbit diagram.

### Accessibility
- `aria-selected`, visible focus rings (arc), text alternative summarizing relationships in a visually hidden paragraph or `figcaption`.

---

## 7. Typography hierarchy

| Role | Spec | Notes |
| --- | --- | --- |
| Brand lockup | Syne 600, ~14–18px, tracking +0.08em | Never hero-dominant |
| Display H1 | Syne 700, ~40–56px desktop (not 72+ vanity) | 2-line break |
| Section index | Plex Mono 12px, `01` / `THESIS` | Always present on major sections |
| Section H2 | Syne 600, ~28–36px | One job per section |
| Lead | Plex Sans 18px / 1.6, max ~42ch in editorial splits | |
| Body | Plex Sans 16px | |
| Annotation | Plex Mono 11–12px, ink-400 | Diagrams only |

**Rule:** Prefer fewer type sizes used with stronger composition over more decorative weights.

---

## 8. Color application

| Use | Color |
| --- | --- |
| Surfaces | chalk-50 / chalk-100 / paper panels inside frames |
| Text | ink-950 / ink-600 |
| Rules / paths | ink-950 @ 12–20% or chalk-200 |
| Active node / primary CTA / selected signal | **teal `#0F6E56`** |
| Diagram relationships / links / secondary focus | **cobalt `#1F4B99`** |
| Ink conversion panel | ink-950 surface, chalk text, teal CTA |

Teal is **signal**, not theme wash. Cobalt does not become purple.

---

## 9. Grid strategy

| Context | Grid |
| --- | --- |
| Hero schematic panel | Local engineering substrate (finer, low contrast) |
| Capability Orthograph / security layers / method spine | Local substrate inside System Frame |
| Editorial thesis, insights, industries | **No** background grid |
| Global page | Clean chalk; no wallpaper |

Vary density: hero panel denser; method spine sparser (axis only).

---

## 10. Motion system (max 3)

1. **Schematic draw / settle** (hero + capability plate): paths opacity 0→1, nodes scale subtly once on enter; ≤600ms; cancel under `prefers-reduced-motion`.  
2. **Section index + title reveal**: 12px translate / fade once per section (IntersectionObserver, once).  
3. **Nav / CTA micro-interaction**: arrow shifts 2–3px on hover/focus; 120–200ms.

No scroll-jacking, no perpetual animation, no heavy animation libraries (CSS + light React state only).

---

## 11. Responsive strategy

| Breakpoint | Intent |
| --- | --- |
| ≤767 | Hero stacks: lockup → H1 → copy → CTAs → **simplified schematic strip** (horizontal domain selector, not orbit). Nav sheet. |
| 768–1023 | Hero 50/50; orthograph simplified (fewer paths). |
| ≥1024 | Full asymmetric hero + orthograph + structured nav panels. |
| ≥1440 | Cap measure; System Frames may widen but type measure stays controlled. |

Touch targets ≥44px for schematic nodes and CTAs.

---

## 12. Accessibility strategy

- Preserve skip link, landmarks, heading order.  
- Schematic = SVG with title/desc + HTML detail dock (not SVG-only content).  
- Focus visible (cobalt ring on light; chalk ring on ink panels).  
- Contrast AA for teal-on-white and chalk-on-ink.  
- Reduced motion disables draw/reveal; content remains complete.  
- Dropdowns: `aria-expanded`, Escape, label names.

---

## 13. Performance strategy

- Inline or static SVG schematic (no Lottie / no Three.js).  
- CSS motion preferred; one small client component for Capability Orthograph + Header.  
- Keep `next/font`; no extra webfonts.  
- No large background images.  
- Lazy-load below-fold diagrams only if split into separate components.  
- Do **not** claim CWV numbers until measured post-implementation.

---

## 14. Component changes

### Redesign / replace
| Component | Change |
| --- | --- |
| `SiteHeader` | Structured panels (Capabilities / Services / Company) |
| `Button` | Signal bar + `→` chrome; sharper radius; clearer secondary |
| `CtaBand` | System Frame corners; denser conversion composition |
| Homepage sections | Replace generic `Section` farm with section-specific layouts |
| New: `SystemFrame` | Cropped rule frame primitive |
| New: `SectionIndex` | Mono `01` + label |
| New: `HeroSchematic` | Proprietary SVG system |
| New: `CapabilityOrthograph` | Interactive accessible system |
| New: `SecurityStack` | Layer diagram |
| New: `MethodSpine` | Process path |
| New: `TechTaxonomyPanel` | Framed taxonomy |

### Keep (API-compatible where possible)
`Container`, `Breadcrumbs`, `PlaceholderNotice`, `ContactForm`, content hooks, SEO helpers.

### Remove / demote
Default “bordered card grid” as homepage pattern; chip-arrow ecosystem row; wallpaper `hero-atmosphere` as global look.

---

## 15. Pages requiring redesign (priority)

| Priority | Page | Depth |
| --- | --- | --- |
| P0 | Home | Full recomposition |
| P0 | Global nav + footer | Structural UX |
| P1 | Capabilities index + detail | Orthograph + editorial |
| P1 | Security, Engineering | Diagram-led |
| P1 | Services hub + detail | Hierarchy, not walls of text |
| P2 | Technology | Taxonomy panel |
| P2 | About / Leadership / Careers / Contact | Visual system alignment |
| P2 | Insights / Work / Solutions / Industries | Template polish + System Frame |
| P3 | Legal | Light alignment only |

---

## 16. What will NOT change

- Next.js / TypeScript / filesystem content / ContentRepository  
- Routes and URL contracts (`/capabilities/*`, `/services/*`, etc.)  
- Contact validation, rate limit, email abstraction  
- Security headers / CSP approach (validate after CSS/SVG additions)  
- SEO metadata architecture, sitemap, robots  
- Anti-fabrication rules and placeholder policy  
- Brand message: **Engineering the Next.**  
- Type families and core palette  
- No database / no public auth / no Kubernetes  

---

## Implementation plan (after approval)

1. Design tokens + primitives (`SystemFrame`, `SectionIndex`, `Button`)  
2. Navigation + footer  
3. Hero + HeroSchematic  
4. Homepage narrative sections (thesis → orthograph → build/secure/operate → …)  
5. Cascade visual system to Security, Engineering, Capabilities, Services  
6. Motion + reduced-motion QA  
7. Responsive QA at listed widths  
8. Phase 5 Premium UX/UI Audit (PASS / NEEDS REVIEW / FAIL)

---

## Quality gate (this review)

### Completed
- Problems, root causes, strategy, homepage composition, nav, orthograph, type, color, grid, motion, responsive, a11y, performance, components, page list, non-goals  

### Remaining
- Stakeholder approval to implement  
- Actual visual implementation + audit with measured notes where available  

### Risks
- Orthograph complexity on mobile → mitigated by alternate mobile composition  
- Over-diagramming → mitigated by selective use + editorial sections  
- CSP vs inline SVG/scripts → keep SVG in React components; avoid inline script  

### Assumptions
- Phase 4 content copy can be lightly edited for hierarchy without inventing claims  
- “Company” nav grouping is acceptable  

### Validation
- Reviewed against Phase 5 brief §§1–32 and Phase 2 brand constraints  
- No production code changed in this step  

### Next
**Await approval → implement Phase 5 redesign per this review.**

---

## Decision requested

1. Approve **Schematic Atelier / System Schematic** as the visual signature?  
2. Approve asymmetric hero + Capability Orthograph?  
3. Approve nav model: Capabilities · Services · Solutions · Technology · Company + CTA?  
4. **Authorize Phase 5 implementation?**
