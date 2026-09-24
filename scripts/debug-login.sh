#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
EMAIL=$(grep -E '^PORTAL_ADMIN_EMAIL=' "$ROOT/.env" | cut -d= -f2-)
PASS=$(grep -E '^PORTAL_ADMIN_PASSWORD=' "$ROOT/.env" | cut -d= -f2-)
echo "EMAIL=$EMAIL"
echo "PASS_LEN=${#PASS}"
python3 - <<PY
import json,urllib.request
payload=json.dumps({"email":"$EMAIL","password":"$PASS"}).encode()
req=urllib.request.Request("http://localhost:3000/api/auth/login", data=payload, headers={"Content-Type":"application/json"})
try:
  with urllib.request.urlopen(req) as r:
    print(r.status, r.read().decode())
except Exception as e:
  if hasattr(e,'read'):
    print(getattr(e,'code', '?'), e.read().decode())
  else:
    print(e)
PY
