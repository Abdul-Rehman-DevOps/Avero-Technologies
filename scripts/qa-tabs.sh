#!/usr/bin/env bash
set -euo pipefail
BASE="${1:-http://localhost:3000}"
cd "$(dirname "$0")/.."
bash scripts/qa-full.sh "$BASE"
echo "--- TAB CHECKS ---"
fail=0
for p in \
  /services/generative-ai-systems \
  /solutions/secure-cloud-platforms \
  /capabilities/ai \
  /services/cloud-architecture \
  /services/devsecops
do
  body=$(curl -s -L "$BASE$p")
  code=$(curl -s -o /dev/null -w '%{http_code}' -L "$BASE$p")
  tabs=$(printf '%s' "$body" | grep -c 'role="tablist"' || true)
  if [ "$code" = "200" ] && [ "$tabs" -ge 1 ]; then
    echo "OK  $p tabs=$tabs"
  else
    echo "FAIL $p code=$code tabs=$tabs"
    fail=$((fail + 1))
  fi
done
# nav mega still present in client bundle markers
curl -s "$BASE/" | grep -q 'Talk to us' && echo "OK  home cta" || { echo "FAIL home cta"; fail=$((fail+1)); }
curl -s "$BASE/services/generative-ai-systems" | grep -qi 'Service tabs\|Problem' && echo "OK  service tab labels" || { echo "FAIL service tab labels"; fail=$((fail+1)); }
echo "TAB_RESULT fail=$fail"
[ "$fail" -eq 0 ]
