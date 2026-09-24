import type { MetadataRoute } from "next";
import { content } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "/",
    "/about",
    "/about/leadership",
    "/about/people",
    "/capabilities",
    "/services",
    "/technology",
    "/solutions",
    "/industries",
    "/engineering",
    "/security",
    "/work",
    "/insights",
    "/careers",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
  ];

  const [capabilities, services, solutions, industries, studies, articles, jobs] =
    await Promise.all([
      content.getCapabilities(),
      content.getServices(),
      content.getSolutions(),
      content.getIndustries(),
      content.getCaseStudies(),
      content.getArticles(),
      content.getJobs(),
    ]);

  const publishedStudies = studies.filter((s) => !s.placeholder);

  const dynamicRoutes = [
    ...capabilities.map((c) => `/capabilities/${c.slug}`),
    ...services.map((s) => `/services/${s.slug}`),
    ...solutions.map((s) => `/solutions/${s.slug}`),
    ...industries.map((i) => `/industries/${i.slug}`),
    ...publishedStudies.map((s) => `/work/${s.slug}`),
    ...articles.map((a) => `/insights/${a.slug}`),
    ...jobs.map((j) => `/careers/${j.slug}`),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
