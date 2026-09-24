"use client";

import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Container } from "@/components/ui/Section";
import { footerNav, navSecondary, siteConfig } from "@/lib/site";
import { media } from "@/lib/media";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 opacity-30">
          <Image
            src={media.office.src}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(7_17_31/0.92),rgb(7_17_31/0.98))]" />
        <Container className="relative grid gap-10 py-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo inverted markClassName="h-11 w-11" />
            <p className="mt-5 max-w-md text-lg text-[var(--footer-fg)]">{siteConfig.tagline}</p>
            <p className="mt-4 max-w-md text-sm text-[var(--footer-muted)]">
              Software, cloud, AI, platforms, security, and data engineered for production.
            </p>
            <div className="mt-8 space-y-2">
              <a
                href={`tel:${siteConfig.phoneTel}`}
                className="block font-mono text-sm no-underline hover:text-[var(--signal)]"
              >
                {siteConfig.phoneDisplay}
              </a>
              <a
                href={`tel:${siteConfig.phoneSecondaryTel}`}
                className="block font-mono text-sm no-underline hover:text-[var(--signal)]"
              >
                {siteConfig.phoneSecondaryDisplay}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="block text-sm text-[var(--footer-muted)] no-underline hover:text-[var(--signal)]"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="tech-label text-[var(--footer-muted)]">Explore</p>
            <ul className="mt-4 grid gap-2">
              {footerNav.slice(0, 8).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm no-underline hover:text-[var(--signal)]"
                    style={{ color: "var(--footer-fg)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="tech-label text-[var(--footer-muted)]">Newsletter</p>
            <p className="mt-3 text-sm text-[var(--footer-muted)]">
              Engineering notes for builders. No spam.
            </p>
            <div className="mt-4">
              <NewsletterForm variant="footer" />
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div
          className="flex flex-col gap-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between"
          style={{ color: "var(--footer-muted)" }}
        >
          <p>
            © {year} {siteConfig.legalName}
          </p>
          <ul className="flex flex-wrap gap-4">
            {navSecondary
              .filter((item) => !footerNav.some((f) => f.href === item.href))
              .map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="no-underline hover:opacity-100">
                    {item.label}
                  </Link>
                </li>
              ))}
            <li>
              <Link href="/cookies" className="no-underline">
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
