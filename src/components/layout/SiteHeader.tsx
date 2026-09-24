"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { media, type MediaKey } from "@/lib/media";
import { navPrimary, siteConfig, type NavItem } from "@/lib/site";

const navMedia: Record<string, MediaKey> = {
  About: "team",
  Services: "engineering",
  Industries: "office",
  "Case Studies": "delivery",
  Insights: "data",
};

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const panelId = useId();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setActivePanel(null);
  }, [pathname]);

  useEffect(() => {
    function onScroll() {
      const next = window.scrollY > 12;
      headerRef.current?.classList.toggle("site-header--scrolled", next);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setActivePanel(null);
      }
    }
    function onPointer(e: MouseEvent) {
      if (!headerRef.current?.contains(e.target as Node)) setActivePanel(null);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onPointer);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="site-header sticky top-0 z-50 border-b border-transparent transition-[border-color,box-shadow] duration-300"
    >
      <Container>
        <div className="relative flex h-16 items-center justify-between gap-4 md:h-[4.25rem]">
          <Link
            href="/"
            className="group no-underline"
            onClick={() => setOpen(false)}
            aria-label={`${siteConfig.legalName} home`}
          >
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-0.5 xl:flex">
            {navPrimary.map((item) => (
              <DesktopItem
                key={item.href + item.label}
                item={item}
                open={activePanel === item.label}
                onToggle={() => setActivePanel((c) => (c === item.label ? null : item.label))}
                onClose={() => setActivePanel(null)}
              />
            ))}
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            <Button href="/contact" size="sm">
              Talk to us
            </Button>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-chalk-200 bg-paper shadow-soft"
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden="true" className="font-mono text-lg">
                {open ? "×" : "≡"}
              </span>
            </button>
          </div>
        </div>
      </Container>

      {open ? (
        <div
          id={panelId}
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-chalk-200 bg-chalk-50 md:top-[4.25rem] xl:hidden"
        >
          <Container>
            <nav aria-label="Mobile" className="flex flex-col gap-1 py-6 pb-28">
              {navPrimary.map((item) => (
                <MobileGroup
                  key={item.href + item.label}
                  item={item}
                  onNavigate={() => setOpen(false)}
                />
              ))}
            </nav>
          </Container>
          <div className="fixed inset-x-0 bottom-0 border-t border-chalk-200 bg-paper p-4">
            <Link
              href="/contact"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-signal text-[15px] font-semibold text-signal-fg no-underline shadow-soft"
              onClick={() => setOpen(false)}
            >
              Talk to us →
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function DesktopItem({
  item,
  open,
  onToggle,
  onClose,
}: {
  item: NavItem;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  if (!item.children?.length) {
    return (
      <Link
        href={item.href}
        className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 no-underline transition-colors hover:bg-chalk-100 hover:text-ink-950"
      >
        {item.label}
      </Link>
    );
  }

  const shot = media[navMedia[item.label] ?? "office"];

  return (
    <div className="relative">
      <button
        type="button"
        className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          open ? "bg-chalk-100 text-ink-950" : "text-ink-700 hover:bg-chalk-100 hover:text-ink-950"
        }`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={onToggle}
      >
        {item.label}
        <span className="ml-1 inline-block text-[10px] opacity-50" aria-hidden>
          ▾
        </span>
      </button>
      {open ? (
        <div className="nav-mega">
          <div className="grid gap-5 lg:grid-cols-[200px_1fr]">
            <div className="relative hidden min-h-[180px] overflow-hidden rounded-2xl lg:block">
              <Image src={shot.src} alt="" fill className="object-cover" sizes="200px" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(7_17_31/0.15),rgb(7_17_31/0.72))]" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="tech-label text-white/70">{item.label}</p>
                <p className="mt-1 text-sm font-semibold text-white">
                  Explore the {item.label.toLowerCase()} path
                </p>
              </div>
            </div>
            <div>
              <div className="mb-3 flex items-center justify-between border-b border-chalk-200 pb-3">
                <p className="tech-label">{item.label}</p>
                <Link
                  href={item.href}
                  className="text-sm font-semibold text-signal no-underline"
                  onClick={onClose}
                >
                  Overview →
                </Link>
              </div>
              <ul className="grid gap-1 sm:grid-cols-2">
                {item.children.map((child) => (
                  <li key={child.href + child.label}>
                    <Link
                      href={child.href}
                      className="block rounded-xl px-3 py-2.5 no-underline transition-colors hover:bg-signal-subtle"
                      onClick={onClose}
                    >
                      <span className="block text-sm font-semibold text-ink-950">{child.label}</span>
                      {child.description ? (
                        <span className="mt-0.5 block text-xs text-ink-600">{child.description}</span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MobileGroup({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  const hasChildren = Boolean(item.children?.length);

  return (
    <div className="border-b border-chalk-200 py-1">
      <div className="flex items-center justify-between gap-3">
        <Link
          href={item.href}
          className="py-3 text-base font-semibold text-ink-950 no-underline"
          onClick={onNavigate}
        >
          {item.label}
        </Link>
        {hasChildren ? (
          <button
            type="button"
            className="h-10 w-10 rounded-lg border border-chalk-200 font-mono"
            aria-expanded={open}
            aria-label={`${open ? "Collapse" : "Expand"} ${item.label}`}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "−" : "+"}
          </button>
        ) : null}
      </div>
      {hasChildren && open ? (
        <ul className="mb-3 space-y-1 pl-1">
          {item.children?.map((child) => (
            <li key={child.href + child.label}>
              <Link
                href={child.href}
                className="block py-2 text-sm text-ink-600 no-underline"
                onClick={onNavigate}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
