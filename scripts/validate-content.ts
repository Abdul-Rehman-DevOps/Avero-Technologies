import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = path.join(process.cwd(), "content", "public");

function walk(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const entries = readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return [full];
  });
}

const forbiddenVisibility = new Set(["internal"]);

let failures = 0;

for (const file of walk(root)) {
  if (file.endsWith(".json")) {
    const raw = readFileSync(file, "utf8");
    if (raw.includes('"visibility": "internal"') || raw.includes('"visibility":"internal"')) {
      console.error(`Internal visibility found in public content: ${file}`);
      failures += 1;
    }
  }
  if (file.endsWith(".md") || file.endsWith(".mdx")) {
    const { data } = matter(readFileSync(file, "utf8"));
    if (data.visibility && forbiddenVisibility.has(String(data.visibility))) {
      console.error(`Internal markdown in public tree: ${file}`);
      failures += 1;
    }
  }
}

if (failures > 0) {
  process.exit(1);
}

console.log("Content validation passed.");
