import type {
  Article,
  Capability,
  CaseStudy,
  Company,
  Credential,
  Industry,
  Job,
  LeadershipSeat,
  Person,
  Product,
  Service,
  Solution,
  TechnologyItem,
  Visibility,
} from "@/types/content";

/**
 * ContentRepository. Stage A: filesystem.
 * Stage B+: swap implementation for CMS without rewriting pages.
 */
export interface ContentRepository {
  getCompany(): Promise<Company>;
  getCapabilities(): Promise<Capability[]>;
  getCapability(slug: string): Promise<Capability | null>;
  getServices(): Promise<Service[]>;
  getService(slug: string): Promise<Service | null>;
  getTechnologies(): Promise<TechnologyItem[]>;
  getSolutions(): Promise<Solution[]>;
  getSolution(slug: string): Promise<Solution | null>;
  getIndustries(): Promise<Industry[]>;
  getIndustry(slug: string): Promise<Industry | null>;
  getCaseStudies(): Promise<CaseStudy[]>;
  getCaseStudy(slug: string): Promise<CaseStudy | null>;
  getArticles(): Promise<Article[]>;
  getArticle(slug: string): Promise<Article | null>;
  getPeople(): Promise<Person[]>;
  getPerson(slug: string): Promise<Person | null>;
  getLeadershipSeats(): Promise<LeadershipSeat[]>;
  getJobs(): Promise<Job[]>;
  getJob(slug: string): Promise<Job | null>;
  getProducts(): Promise<Product[]>;
  /** Verified public credentials only. Empty until real evidence exists. */
  getCredentials(): Promise<Credential[]>;
}

export function isPublic(visibility: Visibility): boolean {
  return visibility === "public";
}
