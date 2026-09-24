#!/usr/bin/env python3
from pathlib import Path
import json
import re

root = Path("content/public")
services = {p.stem for p in (root / "services").glob("*.md")}
caps = json.loads((root / "capabilities" / "index.json").read_text(encoding="utf-8"))
missing = []
for c in caps:
    for s in c.get("relatedServiceSlugs", []):
        if s not in services:
            missing.append((c["id"], s))
print("services", len(services))
print("missing capability links", missing)

slug_re = re.compile(r'relatedServiceSlugs:\n((?:  - .+\n)+)')
for folder in ("industries", "solutions"):
    for p in (root / folder).glob("*.md"):
        text = p.read_text(encoding="utf-8")
        m = slug_re.search(text)
        if not m:
            print("no related", folder, p.name)
            continue
        for line in m.group(1).strip().splitlines():
            slug = line.strip()[2:].strip().strip('"')
            if slug not in services:
                print(folder, "missing", p.name, slug)
print("done")
