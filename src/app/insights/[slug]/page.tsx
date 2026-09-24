import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Container, Section } from "@/components/ui/Section";
import { content } from "@/lib/content";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const articles = await content.getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = await content.getArticle(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.seo.title,
    description: article.seo.description,
    path: `/insights/${article.slug}`,
    type: "article",
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await content.getArticle(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: article.authors.length
      ? article.authors.map((name) => ({ "@type": "Person", name }))
      : [{ "@type": "Organization", name: "AVERO TECHNOLOGIES" }],
    mainEntityOfPage: absoluteUrl(`/insights/${article.slug}`),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        index="INS"
        label="Insights"
        title={article.title}
        description={article.summary}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: article.title },
        ]}
        identity="editorial"
      />
      <Section>
        <Container prose>
          <div className="mb-8 flex flex-wrap gap-3 font-mono text-xs text-ink-400 uppercase">
            <span>{article.category}</span>
            <span>Published {article.publishedAt}</span>
            <span>Updated {article.updatedAt}</span>
            <span>{article.readingTimeMinutes} min</span>
          </div>
          {article.tags.length > 0 ? (
            <ul className="mb-8 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md border border-chalk-200 bg-chalk-100 px-2 py-1 text-xs text-ink-600"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
          <article className="space-y-4 text-base leading-7 text-ink-800 whitespace-pre-wrap">
            {article.body}
          </article>
        </Container>
      </Section>
    </>
  );
}
