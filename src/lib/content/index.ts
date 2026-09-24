import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type {
  Article,
  Capability,
  CaseStudy,
  Company,
  Credential,
  Industry,
  Job,
  Product,
  Service,
  Solution,
  TechnologyItem,
  Visibility,
} from "@/types/content";
import { type ContentRepository, isPublic } from "@/lib/content/repository";

const CONTENT_ROOT = path.join(process.cwd(), "content", "public");

async function readJson<T>(relativePath: string): Promise<T> {
  const full = path.join(CONTENT_ROOT, relativePath);
  const raw = await readFile(full, "utf8");
  return JSON.parse(raw) as T;
}

async function listMdx(dir: string): Promise<string[]> {
  const full = path.join(CONTENT_ROOT, dir);
  try {
    const entries = await readdir(full);
    return entries.filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  } catch {
    return [];
  }
}

async function readMdxFrontmatter<T extends { visibility: Visibility }>(
  dir: string,
  file: string,
): Promise<(T & { body: string }) | null> {
  const full = path.join(CONTENT_ROOT, dir, file);
  const raw = await readFile(full, "utf8");
  const { data, content } = matter(raw);
  const doc = data as T;
  if (!isPublic(doc.visibility)) {
    return null;
  }
  return { ...doc, body: content.trim() };
}

function slugFromFile(file: string): string {
  return file.replace(/\.mdx?$/, "");
}

function withoutBody<T extends { body: string }>(doc: T): Omit<T, "body"> {
  const clone = { ...doc };
  delete (clone as { body?: string }).body;
  return clone;
}

export const filesystemContentRepository: ContentRepository = {
  async getCompany() {
    return readJson<Company>("organization.json");
  },

  async getCapabilities() {
    const data = await readJson<Capability[]>("capabilities/index.json");
    return data.filter((c) => isPublic(c.visibility));
  },

  async getCapability(slug) {
    const all = await this.getCapabilities();
    return all.find((c) => c.slug === slug) ?? null;
  },

  async getServices() {
    const files = await listMdx("services");
    const items: Service[] = [];
    for (const file of files) {
      const doc = await readMdxFrontmatter<Service>("services", file);
      if (doc) {
        const service = withoutBody(doc);
        items.push({ ...service, slug: service.slug || slugFromFile(file) });
      }
    }
    return items.sort((a, b) => a.title.localeCompare(b.title));
  },

  async getService(slug) {
    const all = await this.getServices();
    return all.find((s) => s.slug === slug) ?? null;
  },

  async getTechnologies() {
    const data = await readJson<TechnologyItem[]>("technology/index.json");
    return data.filter((t) => isPublic(t.visibility) && !t.partnerClaim);
  },

  async getSolutions() {
    const files = await listMdx("solutions");
    const items: Solution[] = [];
    for (const file of files) {
      const doc = await readMdxFrontmatter<Solution>("solutions", file);
      if (doc) {
        items.push({
          ...withoutBody(doc),
          body: doc.body,
          slug: doc.slug || slugFromFile(file),
        });
      }
    }
    return items;
  },

  async getSolution(slug) {
    const all = await this.getSolutions();
    return all.find((s) => s.slug === slug) ?? null;
  },

  async getIndustries() {
    const files = await listMdx("industries");
    const items: Industry[] = [];
    for (const file of files) {
      const doc = await readMdxFrontmatter<Industry>("industries", file);
      if (doc) {
        const rest = withoutBody(doc);
        items.push({ ...rest, slug: rest.slug || slugFromFile(file) });
      }
    }
    return items;
  },

  async getIndustry(slug) {
    const all = await this.getIndustries();
    return all.find((i) => i.slug === slug) ?? null;
  },

  async getCaseStudies() {
    const files = await listMdx("case-studies");
    const items: CaseStudy[] = [];
    for (const file of files) {
      const doc = await readMdxFrontmatter<CaseStudy>("case-studies", file);
      if (doc) {
        const rest = withoutBody(doc);
        items.push({ ...rest, slug: rest.slug || slugFromFile(file) });
      }
    }
    return items;
  },

  async getCaseStudy(slug) {
    const all = await this.getCaseStudies();
    return all.find((c) => c.slug === slug) ?? null;
  },

  async getArticles() {
    const files = await listMdx("insights");
    const items: Article[] = [];
    for (const file of files) {
      const doc = await readMdxFrontmatter<Omit<Article, "body" | "readingTimeMinutes">>(
        "insights",
        file,
      );
      if (doc) {
        const words = doc.body.split(/\s+/).filter(Boolean).length;
        items.push({
          ...doc,
          slug: doc.slug || slugFromFile(file),
          readingTimeMinutes: Math.max(1, Math.round(words / 200)),
        });
      }
    }
    return items.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  },

  async getArticle(slug) {
    const all = await this.getArticles();
    return all.find((a) => a.slug === slug) ?? null;
  },

  async getJobs() {
    const files = await listMdx("jobs");
    const items: Job[] = [];
    for (const file of files) {
      const doc = await readMdxFrontmatter<Job>("jobs", file);
      if (doc && doc.status === "open") {
        const rest = withoutBody(doc);
        items.push({ ...rest, slug: rest.slug || slugFromFile(file) });
      }
    }
    return items;
  },

  async getJob(slug) {
    const all = await this.getJobs();
    return all.find((j) => j.slug === slug) ?? null;
  },

  async getProducts() {
    try {
      const data = await readJson<Product[]>("products/index.json");
      return data.filter((p) => isPublic(p.visibility) && p.status === "public");
    } catch {
      return [];
    }
  },

  async getCredentials() {
    try {
      const data = await readJson<Credential[]>("credentials/index.json");
      return data.filter((c) => isPublic(c.visibility) && c.status === "verified");
    } catch {
      return [];
    }
  },
};

export const content = filesystemContentRepository;
