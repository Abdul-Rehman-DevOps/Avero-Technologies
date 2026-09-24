import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type BuildMetaInput = {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function absoluteUrl(path = "/"): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  type = "website",
  noIndex = false,
}: BuildMetaInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle =
    title === siteConfig.name
      ? `${siteConfig.name} | ${siteConfig.tagline}`
      : `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteConfig.url || "http://localhost:3000"),
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.legalName,
      locale: siteConfig.locale,
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    telephone: [siteConfig.phoneTel, siteConfig.phoneSecondaryTel],
    email: siteConfig.email,
  };
}
