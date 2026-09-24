#!/usr/bin/env bash
# Full A–Z QA: static checks, routes, APIs, tabs, UX signals
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BASE="${1:-http://localhost:3000}"
cd "$ROOT"

fail=0
pass=0
ok() { echo "OK  $*"; pass=$((pass + 1)); }
bad() { echo "FAIL $*"; fail=$((fail + 1)); }

echo "== Static quality =="
npm run typecheck && ok typecheck || bad typecheck
npm test && ok unit-tests || bad unit-tests
npm run validate:content && ok content-validate || bad content-validate

echo "== Content depth =="
svc=$(ls content/public/services/*.md | wc -l)
sol=$(ls content/public/solutions/*.md | wc -l)
ind=$(ls content/public/industries/*.md | wc -l)
ins=$(ls content/public/insights/*.md | wc -l)
[ "$svc" -ge 18 ] && ok "services=$svc" || bad "services=$svc"
[ "$sol" -ge 5 ] && ok "solutions=$sol" || bad "solutions=$sol"
[ "$ind" -ge 8 ] && ok "industries=$ind" || bad "industries=$ind"
[ "$ins" -ge 5 ] && ok "insights=$ins" || bad "insights=$ins"

echo "== Professional validation copy =="
if grep -R "Too small: expected\|Invalid option: expected one of" content src 2>/dev/null | grep -v node_modules | grep -v '.test.' >/dev/null; then
  bad "raw zod strings still in source"
else
  ok "no raw zod dumps in source"
fi
node -e "
const { contactSchema } = require('./src/lib/contact/schema.ts');
" 2>/dev/null || true
# Use vitest-proven path via typescript import through test already run

python3 - <<'PY'
from pathlib import Path
text = Path('src/lib/contact/schema.ts').read_text(encoding='utf-8')
for needle in ['Company is required', 'Please select an area', 'Please select a timeline']:
    assert needle in text, needle
print('schema messages ok')
PY
ok "contact schema friendly messages"

echo "== HTTP routes (tabs) =="
paths=(
  / /about /services /solutions /industries /work /careers
  /insights /contact /capabilities /technology /engineering /security /trust /privacy /terms
  /cookies /portal/login /health /api/careers /api/insights /case-studies
  /services/software-engineering /services/generative-ai-systems /services/cloud-architecture
  /services/platform-engineering /services/devsecops /services/data-engineering
  /services/application-security /services/rag-and-knowledge-systems
  /industries/fintech /industries/healthcare /industries/saas /industries/ecommerce
  /solutions/secure-cloud-platforms /solutions/enterprise-integration-hub
  /solutions/ai-ready-data-foundations /solutions/zero-trust-software-delivery
  /work/secure-multi-cloud-landing /work/ai-evaluation-platform
  /insights/secure-defaults-in-delivery /capabilities/ai /capabilities/cloud
  /careers
)
for p in "${paths[@]}"; do
  code=$(curl -s -o /tmp/avero_qa_body -w '%{http_code}' -L "$BASE$p")
  if [ "$code" = "200" ]; then ok "$code $p"; else bad "$code $p"; fi
done

echo "== Interactive tabs =="
for p in /services/generative-ai-systems /solutions/secure-cloud-platforms /capabilities/ai; do
  body=$(curl -s -L "$BASE$p")
  echo "$body" | grep -q 'role="tablist"' && ok "tablist $p" || bad "tablist $p"
  echo "$body" | grep -q 'page-hero__veil\|page-hero' && ok "hero $p" || bad "hero $p"
done

echo "== Scroll motion signals =="
home=$(curl -s -L "$BASE/")
echo "$home" | grep -q 'reveal-ready\|ScrollProgress\|stagger-in' && ok "home motion hooks" || bad "home motion hooks"
# Client component ships as JS; ensure Reveal bundle exists in page references via RSC payload markers
curl -s "$BASE/_next/static/chunks/" >/dev/null 2>&1 || true
css=$(curl -s -L "$BASE/" | tr '"' '\n' | grep -E '_next/static/css/.*\.css' | head -1)
if [ -n "$css" ]; then
  sheet=$(curl -s -L "$BASE$css")
  echo "$sheet" | grep -q 'reveal-ready' && ok "css reveal-ready" || bad "css reveal-ready"
  echo "$sheet" | grep -q 'reveal-in' && ok "css reveal-in" || bad "css reveal-in"
else
  bad "css path missing"
fi

echo "== APIs =="
# GET APIs
curl -s "$BASE/api/careers" | grep -q '"count"' && ok careers-api || bad careers-api
curl -s "$BASE/api/insights" | grep -q '"articles"' && ok insights-api || bad insights-api
curl -s "$BASE/health" | grep -q '"status"' && ok health-api || bad health-api

# Contact validation (professional message)
contact_bad=$(curl -s -X POST "$BASE/api/contact" -H 'Content-Type: application/json' -d '{}')
echo "$contact_bad" | grep -qi 'correct the highlighted\|Please' && ok contact-validation-msg || bad contact-validation-msg
echo "$contact_bad" | grep -qi 'Too small\|expected one of' && bad contact-raw-zod || ok contact-no-raw-zod
echo "$contact_bad" | grep -q 'Company is required\|Please select an area\|Please enter' && ok contact-field-friendly || bad contact-field-friendly

# Newsletter validation
news_bad=$(curl -s -X POST "$BASE/api/newsletter" -H 'Content-Type: application/json' -d '{"email":"nope"}')
echo "$news_bad" | grep -qi 'valid email' && ok newsletter-validation || bad newsletter-validation
echo "$news_bad" | grep -qi 'Too small\|Invalid option' && bad newsletter-raw || ok newsletter-no-raw

# Auth validation
auth_bad=$(curl -s -X POST "$BASE/api/auth/login" -H 'Content-Type: application/json' -d '{"email":"x","password":"1"}')
echo "$auth_bad" | grep -qi 'email\|password\|valid' && ok auth-validation || bad auth-validation

# Portal login success
EMAIL=$(grep -E '^PORTAL_ADMIN_EMAIL=' .env | cut -d= -f2- | tr -d '\r')
PASS=$(grep -E '^PORTAL_ADMIN_PASSWORD=' .env | cut -d= -f2- | tr -d '\r')
if [ -n "$EMAIL" ] && [ -n "$PASS" ]; then
  code=$(python3 - <<PY
import json,urllib.request
payload=json.dumps({"email":"$EMAIL","password":"$PASS"}).encode()
req=urllib.request.Request("$BASE/api/auth/login", data=payload, headers={"Content-Type":"application/json"})
try:
  print(urllib.request.urlopen(req).status)
except Exception as e:
  print(getattr(e,'code',500))
PY
)
  [ "$code" = "200" ] && ok portal-login || bad "portal-login $code"
else
  bad portal-creds-missing
fi

echo "== Brand / contact signals =="
curl -s "$BASE/" | grep -q 'contact@avero.com' && ok public-email || bad public-email
curl -s "$BASE/contact" | grep -qi 'Submit project intake\|project intake' && ok contact-form || bad contact-form
curl -s "$BASE/" | grep -qi 'Avero' && ok brand-name || bad brand-name

echo "RESULT pass=$pass fail=$fail"
[ "$fail" -eq 0 ]
