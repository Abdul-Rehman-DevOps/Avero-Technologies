import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/visual/Reveal";
import { content } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Insights",
  description: "Engineering insights from Avero on AI, cloud, security, platforms, and reliability.",
  path: "/insights",
});

export default async function InsightsPage() {
  const articles = await content.getArticles();
  const categories = Array.from(new Set(articles.map((a) => a.category)));

  return (
    <>
      <PageHero
        mediaKey="data"
        label="Insights"
        title="Engineering notes from the field"
        description="Practical writing on delivery, security, platforms, AI evaluation, and cloud architecture."
        crumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
      />
      <Section>
        <Container>
          <Reveal>
            <div className="mb-8 flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-chalk-200 bg-paper px-3 py-1 text-xs font-semibold tracking-wide text-ink-600 uppercase"
                >
                  {category}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            {articles.map((article, i) => (
              <Reveal key={article.slug} delay={(i % 4) * 45}>
                <Link
                  href={`/insights/${article.slug}`}
                  className="surface-card group flex h-full flex-col p-6 no-underline"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-ink-400">
                    <span className="rounded-md bg-signal-subtle px-2 py-0.5 text-signal">
                      {article.category}
                    </span>
                    <span>
                      {new Date(article.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span>{article.readingTimeMinutes} min read</span>
                  </div>
                  <h2 className="font-display mt-4 text-2xl font-semibold text-ink-950 group-hover:text-signal">
                    {article.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">{article.summary}</p>
                  <p className="mt-5 text-sm font-semibold text-signal">Read article →</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
