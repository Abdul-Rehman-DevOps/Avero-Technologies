# Avero UI/UX redesign script

## Goals
- Feel premium and modern (2025 product site), not flat brochure.
- Keep Avero brand: ink navy + teal signal (no purple / cream / terracotta AI defaults).
- Keep Vercel-safe fonts: Space Grotesk, Source Sans 3, IBM Plex Mono.
- Keep motion light for 1 vCPU (no continuous heavy GPU effects).

## Problems (from live screenshot)
1. Hero body copy is low-contrast on Earth city lights.
2. Hero feels sparse: brand + CTAs float without a composed frame.
3. Header/hero competition: two identical “Talk to us” without visual hierarchy.
4. Sections still read as generic white cards and lists.
5. Atmosphere is weak outside the hero.

## Design system changes
1. Stronger hero veil + left readability wash.
2. Hero content “signal plate” (soft glass panel) for copy + CTAs.
3. Status chip + brand stack remain; increase supporting text contrast.
4. Header: quieter on hero (transparent → solid on scroll); primary CTA stays.
5. Section kit: `section-kicker`, asymmetric headlines, glow dividers, bento service grid.
6. Method panels stay immersive; services become 2+1 bento.
7. Insights/work rows get denser editorial rhythm.
8. Footer stays dark with clearer contact mono stack.

## Acceptance checks
- [x] Hero paragraph readable on Earth background (hero plate + stronger veil)
- [x] First viewport: brand dominant, one headline, one support line, CTA pair
- [x] Stable fonts only (Space Grotesk / Source Sans 3 / IBM Plex Mono)
- [x] Services use bento layout
- [x] `npm run build` passes
- [x] Mobile hero CTAs stack cleanly
- [x] No Syne/Outfit fonts (Vercel font loader risk)
