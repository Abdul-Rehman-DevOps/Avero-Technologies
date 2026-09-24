# Content research flow (Avero)

## Intent

Enrich Avero site content using **patterns** from leading global tech and IT firms
(Accenture, IBM Consulting, Deloitte, Capgemini, Infosys, Cognizant, TCS, and peers).

We do **not** copy their text, branding, or case claims.

## Flow

1. **Research** service lines used by top IT firms:
   digital/cloud, AI and data, cybersecurity, application modernization,
   platforms/DevOps, industry vertical pages.
2. **Map** those lines onto Avero capabilities:
   AI, Engineering, Cloud, Platform, Security, Data, Labs.
3. **Author** original service records with problem, approach, technologies,
   security considerations, and engagement context.
4. **Link** industries to related services and use cases.
5. **Package** multi-service outcomes as Solutions.
6. **Validate** with `npm run validate:content`, typecheck, unit tests,
   build, and HTTP smoke/API tests.
7. **QA** every primary tab for empty states, broken links, and thin copy.

## Implementation

Run:

```bash
python3 scripts/enrich-content.py
npm run validate:content
npm run typecheck && npm test && npm run build
bash scripts/qa-full.sh
```
