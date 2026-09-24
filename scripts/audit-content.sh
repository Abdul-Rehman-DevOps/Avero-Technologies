#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
echo "SERVICES: $(ls content/public/services | wc -l)"
ls content/public/services
echo
echo "SOLUTIONS:"; ls content/public/solutions
echo
echo "INDUSTRIES:"; ls content/public/industries
echo
python3 - <<'PY'
import json
from pathlib import Path
caps=json.loads(Path('content/public/capabilities/index.json').read_text())
print('CAPABILITIES', len(caps), [c['slug'] for c in caps])
tech=json.loads(Path('content/public/technology/index.json').read_text())
print('TECH', len(tech))
PY
echo
echo '--- software-engineering.md ---'
head -45 content/public/services/software-engineering.md
echo
echo '--- fintech.md ---'
head -40 content/public/industries/fintech.md
echo
echo '--- capabilities ai ---'
python3 - <<'PY'
import json
from pathlib import Path
caps=json.loads(Path('content/public/capabilities/index.json').read_text())
print(json.dumps(caps[0], indent=2)[:1200])
PY
