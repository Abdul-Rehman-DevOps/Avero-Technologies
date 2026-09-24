export type Visibility = "public" | "draft" | "internal";

export type SeoFields = {
  title: string;
  description: string;
  canonical?: string;
};

export type Company = {
  legalName: string;
  brandName: string;
  tagline: string;
  domain: string;
  locations: Array<{
    id: string;
    name: string;
    city: string;
    country: string;
    visibility: Visibility;
  }>;
  publicContact: {
    email: string | null;
    phone: string | null;
  };
  social: Array<{ label: string; url: string }>;
};

export type CapabilityId =
  | "ai"
  | "engineering"
  | "cloud"
  | "platform"
  | "security"
  | "data"
  | "labs";

export type Capability = {
  id: CapabilityId;
  slug: string;
  name: string;
  shortName: string;
  summary: string;
  mandate: string;
  capabilities: string[];
  relatedServiceSlugs: string[];
  status: "active" | "forming" | "research";
  visibility: Visibility;
  seo: SeoFields;
};

export type Service = {
  slug: string;
  title: string;
  capability: CapabilityId;
  summary: string;
  purpose: string;
  problem: string;
  capabilities: string[];
  approach: string;
  technologies: string[];
  securityConsiderations: string;
  engagementContext: string;
  visibility: Visibility;
  seo: SeoFields;
};

export type TechnologyItem = {
  id: string;
  name: string;
  category:
    | "cloud"
    | "containers"
    | "infrastructure"
    | "platform"
    | "observability"
    | "security"
    | "ai"
    | "data";
  capabilities: CapabilityId[];
  partnerClaim: boolean;
  visibility: Visibility;
};

export type Solution = {
  slug: string;
  title: string;
  problem: string;
  outcome: string;
  approach: string;
  relatedServiceSlugs: string[];
  relatedCapabilities: CapabilityId[];
  visibility: Visibility;
  seo: SeoFields;
  body?: string;
};

export type Industry = {
  slug: string;
  title: string;
  summary: string;
  useCases: string[];
  relatedServiceSlugs: string[];
  relatedCapabilities: CapabilityId[];
  evidenceLevel: "none" | "directional" | "evidenced";
  visibility: Visibility;
  seo: SeoFields;
};

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  context: string;
  architecture: string;
  technology: string[];
  engineeringChallenge: string;
  securityConsiderations: string;
  implementation: string;
  results: string;
  lessonsLearned: string;
  clientDisplayName: string | null;
  capabilities: CapabilityId[];
  visibility: Visibility;
  placeholder: boolean;
  seo: SeoFields;
};

export type Article = {
  slug: string;
  title: string;
  summary: string;
  body: string;
  category: string;
  tags: string[];
  authors: string[];
  publishedAt: string;
  updatedAt: string;
  readingTimeMinutes: number;
  visibility: Visibility;
  seo: SeoFields;
};

/** Future public credentials. Never render unless status is verified and visibility is public. */
export type Credential = {
  id: string;
  name: string;
  issuer: string;
  holder: string | null;
  credentialId: string | null;
  issueDate: string | null;
  expirationDate: string | null;
  verificationUrl: string | null;
  status: "draft" | "verified" | "expired" | "revoked";
  visibility: Visibility;
};

export type Job = {
  slug: string;
  title: string;
  department: string;
  team: string | null;
  locationType: "onsite" | "hybrid" | "remote";
  locations: string[];
  employmentType: "full-time" | "part-time" | "contract" | "internship";
  seniority: "junior" | "mid" | "senior" | "staff" | "principal" | "director";
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  applicationProcess: string;
  applyUrl: string | null;
  status: "open" | "closed" | "draft";
  visibility: Visibility;
  publishedAt: string;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  productType: "saas" | "api" | "toolkit" | "platform" | "research";
  status: "ideation" | "private-beta" | "public" | "deprecated";
  capabilityOwner: CapabilityId;
  marketingSummary: string;
  visibility: Visibility;
};
