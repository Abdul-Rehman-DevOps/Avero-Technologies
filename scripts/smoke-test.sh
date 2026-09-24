#!/usr/bin/env bash
set -euo pipefail
BASE="${1:-http://localhost:3000}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
fail=0
pass=0

check() {
  local path="$1" expect="${2:-200}"
  local code
  code=$(curl -s -o /tmp/avero_body -w '%{http_code}' -L "$BASE$path")
  if [ "$code" = "$expect" ]; then
    echo "OK  $code $path"
    pass=$((pass + 1))
  else
    echo "FAIL $code (want $expect) $path"
    fail=$((fail + 1))
  fi
}

for p in / /about /services /work /careers /insights /contact /portal/login /health /api/careers; do
  check "$p" 200
done

code=$(curl -s -o /dev/null -w '%{http_code}' "$BASE/portal")
if [ "$code" = "307" ] || [ "$code" = "302" ] || [ "$code" = "303" ]; then
  echo "OK  $code /portal redirect"
  pass=$((pass + 1))
else
  echo "FAIL $code /portal"
  fail=$((fail + 1))
fi

EMAIL=""; PASS=""
if [ -f "$ROOT/.env" ]; then
  EMAIL=$(grep -E '^PORTAL_ADMIN_EMAIL=' "$ROOT/.env" | head -1 | cut -d= -f2- | tr -d '\r')
  PASS=$(grep -E '^PORTAL_ADMIN_PASSWORD=' "$ROOT/.env" | head -1 | cut -d= -f2- | tr -d '\r')
fi

if [ -n "$EMAIL" ] && [ -n "$PASS" ]; then
  code=$(curl -s -c /tmp/avero_cj -o /tmp/avero_body -w '%{http_code}' -X POST "$BASE/api/auth/login" \
    -H 'Content-Type: application/json' \
    -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\"}")
  echo "login $code"
  [ "$code" = "200" ] && pass=$((pass + 1)) || fail=$((fail + 1))
fi

curl -s "$BASE/" | grep -q 'Avero' && echo "OK brand" && pass=$((pass + 1)) || fail=$((fail + 1))
curl -s "$BASE/" | grep -q 'unsplash\|hero-plane\|Systems built' && echo "OK new UI markers" && pass=$((pass + 1)) || fail=$((fail + 1))

echo "RESULT pass=$pass fail=$fail"
[ "$fail" -eq 0 ]
