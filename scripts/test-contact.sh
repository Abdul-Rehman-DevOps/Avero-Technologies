#!/usr/bin/env bash
set -euo pipefail
BASE="${1:-http://localhost:3000}"
payload='{
  "name": "Test User",
  "workEmail": "lead@acme.tech",
  "company": "Acme Corp",
  "role": "CTO",
  "lookingToBuild": "Secure multi-cloud landing zone",
  "projectType": "cloud",
  "timeline": "1-3m",
  "budget": "",
  "message": "Interested in a landing zone engagement with enough detail for validation checks.",
  "website": ""
}'
code=$(curl -s -o /tmp/avero_contact.json -w '%{http_code}' -X POST "$BASE/api/contact" \
  -H 'Content-Type: application/json' -d "$payload")
echo "contact $code $(cat /tmp/avero_contact.json)"
[ "$code" = "200" ] || [ "$code" = "201" ]
