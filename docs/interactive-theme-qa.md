# Interactive + Theme Fix QA (2026-09-16)

## Fixes shipped
- System schematic: SVG clicks replaced with reliable absolute hit-target buttons; panel controls update selection immediately
- Capability orthograph: selection keyed by capability `id`; detail panel re-animates on change; no longer stuck on AI
- Wording: homepage Insights heading corrected; AI tab shows `AI` / `Intelligence` (not AI/AI)
- Theme: light + dark via `data-theme` CSS variables; header `DK`/`LT` toggle; preference persisted in `localStorage`
- Motion: panel swap animation; schematic path pulse on active node; safer reveal behavior retained

## Automated checks
| Check | Result |
| --- | --- |
| typecheck | PASS |
| lint | PASS |
| vitest (8) | PASS including orthograph click test |
| production build (65 pages) | PASS |
| route smoke (prod :3020) | PASS (see below) |

## Route smoke
All listed routes returned expected status:
- `200` home, capabilities (+ai/cloud), services (+slug), solutions (+slug), technology, engineering, security, industries (+slug), work, insights (+slug), about, leadership, people, careers, contact, legal, health, ready, sitemap, robots
- `308` `/trust` → redirect away from cert theater
- `404` unknown path

## Manual verification still recommended after restart
1. Hard refresh (`Ctrl+Shift+R`)
2. Homepage: click ENG/CLD/… nodes and domain buttons; detail panel must change
3. Hero schematic: node click navigates to capability page
4. Theme toggle DK/LT in header
5. Mobile nav open/close + Company accordion
6. Contact form validation (without submitting secrets)
