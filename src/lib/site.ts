function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/$/, "");
  // Vercel sets these automatically when the project is linked.
  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "");
    return `https://${host}`;
  }
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Avero",
  legalName: "Avero Technologies",
  tagline: "Systems built for production.",
  description:
    "Avero Technologies designs and delivers software, cloud, AI, platform, security, and data systems for production workloads.",
  url: siteUrl(),
  locale: "en_US",
  phoneDisplay: "+92 303 9692131",
  phoneTel: "+923039692131",
  phoneSecondaryDisplay: "0313 8554552",
  phoneSecondaryTel: "+923138554552",
  email: "contact@averotechnologies.com",
} as const;

export type NavChild = {
  label: string;
  href: string;
  description?: string;
  meta?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: readonly NavChild[];
};

/**
 * Primary nav inspired by enterprise patterns (segmented mega-menus)
 * without copying any brand: Services|Solutions dual taxonomy + clear IA.
 */
export const navPrimary: readonly NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Company", href: "/about", description: "Who we are and how we work" },
      { label: "Engineering", href: "/engineering", description: "How we deliver" },
      { label: "Security", href: "/security", description: "How we protect systems" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Software Engineering",
        href: "/services/software-engineering",
        description: "APIs, products, and distributed systems",
        meta: "ENG",
      },
      {
        label: "Generative AI Systems",
        href: "/services/generative-ai-systems",
        description: "Production AI with evaluation and controls",
        meta: "AI",
      },
      {
        label: "RAG & Knowledge Systems",
        href: "/services/rag-and-knowledge-systems",
        description: "Grounded retrieval for enterprise knowledge",
        meta: "AI",
      },
      {
        label: "Cloud Architecture",
        href: "/services/cloud-architecture",
        description: "Identity, network, and workload design",
        meta: "CLD",
      },
      {
        label: "Cloud Migration",
        href: "/services/cloud-migration",
        description: "Move workloads with controlled cutovers",
        meta: "CLD",
      },
      {
        label: "Platform Engineering",
        href: "/services/platform-engineering",
        description: "Self-service delivery platforms",
        meta: "PLT",
      },
      {
        label: "DevSecOps",
        href: "/services/devsecops",
        description: "Security in the delivery path",
        meta: "SEC",
      },
      {
        label: "Application Security",
        href: "/services/application-security",
        description: "Threat modeling and secure defaults",
        meta: "SEC",
      },
      {
        label: "Data Engineering",
        href: "/services/data-engineering",
        description: "Pipelines and AI-ready foundations",
        meta: "DAT",
      },
      {
        label: "SaaS Platforms",
        href: "/services/saas-platforms",
        description: "Multi-tenant product systems",
        meta: "ENG",
      },
      { label: "All services", href: "/services", description: "Full catalog by capability", meta: "ALL" },
      { label: "Solutions overview", href: "/solutions", description: "Outcome-shaped packages", meta: "SOL" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Financial services", href: "/industries/fintech" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "SaaS & software", href: "/industries/saas" },
      { label: "E-commerce", href: "/industries/ecommerce" },
      { label: "Logistics", href: "/industries/logistics" },
      { label: "Enterprise", href: "/industries/enterprise" },
      { label: "All industries", href: "/industries" },
    ],
  },
  {
    label: "Case Studies",
    href: "/work",
    children: [
      { label: "All case studies", href: "/work", description: "Architecture and outcomes" },
      {
        label: "Secure cloud platforms",
        href: "/work/secure-multi-cloud-landing",
        description: "Identity-first cloud landing zones",
      },
      {
        label: "AI delivery platform",
        href: "/work/ai-evaluation-platform",
        description: "Governed generative AI rollout",
      },
      {
        label: "Developer platform",
        href: "/work/developer-self-service-platform",
        description: "Faster, safer software delivery",
      },
      {
        label: "Zero-trust delivery",
        href: "/work/zero-trust-delivery-pipeline",
        description: "Signed artifacts and identity-based CI/CD",
      },
    ],
  },
  { label: "Careers", href: "/careers" },
  {
    label: "Insights",
    href: "/insights",
    children: [
      { label: "All insights", href: "/insights", description: "Engineering notes and briefings" },
      { label: "Secure defaults", href: "/insights/secure-defaults-in-delivery" },
      { label: "Platform ROI", href: "/insights/measuring-platform-engineering-roi" },
      { label: "AI evaluation", href: "/insights/ai-evaluation-is-product-work" },
      { label: "Incident readiness", href: "/insights/incident-ready-by-default" },
    ],
  },
] as const;

export const navSecondary = [
  { label: "Solutions", href: "/solutions" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Technology", href: "/technology" },
  { label: "Engineering", href: "/engineering" },
  { label: "Security", href: "/security" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const;

export const footerNav = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/work" },
  { label: "Careers", href: "/careers" },
  { label: "Insights", href: "/insights" },
  { label: "Talk to us", href: "/contact" },
] as const;

export const capabilityNodes = [
  { id: "ai", label: "AI", tabLabel: "Intelligence", href: "/capabilities/ai", code: "AI", research: false },
  {
    id: "engineering",
    label: "Engineering",
    tabLabel: "Engineering",
    href: "/capabilities/engineering",
    code: "ENG",
    research: false,
  },
  { id: "cloud", label: "Cloud", tabLabel: "Cloud", href: "/capabilities/cloud", code: "CLD", research: false },
  {
    id: "platform",
    label: "Platform",
    tabLabel: "Platform",
    href: "/capabilities/platform",
    code: "PLT",
    research: false,
  },
  {
    id: "security",
    label: "Security",
    tabLabel: "Security",
    href: "/capabilities/security",
    code: "SEC",
    research: false,
  },
  { id: "data", label: "Data", tabLabel: "Data", href: "/capabilities/data", code: "DAT", research: false },
  { id: "labs", label: "Labs", tabLabel: "Labs", href: "/capabilities/labs", code: "LAB", research: true },
] as const;
