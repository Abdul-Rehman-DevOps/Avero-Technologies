import type { Metadata } from "next";
import { IBM_Plex_Mono, Outfit, Syne } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { BootLoader } from "@/components/system/BootLoader";
import { PageTransition } from "@/components/system/PageTransition";
import { ScrollProgressBar } from "@/components/system/ScrollProgressBar";
import { ThemeProvider } from "@/components/system/ThemeProvider";
import { buildMetadata, organizationJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
  fallback: ["Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: true,
  preload: true,
});

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  fallback: ["Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: true,
  preload: true,
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
  fallback: ["Consolas", "Menlo", "monospace"],
  adjustFontFallback: true,
  preload: true,
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: siteConfig.name,
    description: siteConfig.description,
    path: "/",
  }),
  icons: {
    icon: "/brand/avero-mark.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;d.classList.add('avero-js');if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('avero-reduce');}d.classList.add('avero-ready');}catch(e){document.documentElement.classList.add('avero-js','avero-ready');}})();`,
          }}
        />
      </head>
      <body className="min-h-dvh font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <SkipLink />
        <ThemeProvider>
          <BootLoader />
          <ScrollProgressBar />
          <PageTransition />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
