import { NextResponse } from "next/server";
import { content } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const limit = Math.min(Number(searchParams.get("limit") ?? "20") || 20, 50);

  if (slug) {
    const article = await content.getArticle(slug);
    if (!article) {
      return NextResponse.json({ error: "That article was not found." }, { status: 404 });
    }
    return NextResponse.json({
      article: {
        slug: article.slug,
        title: article.title,
        summary: article.summary,
        category: article.category,
        tags: article.tags,
        authors: article.authors,
        publishedAt: article.publishedAt,
        updatedAt: article.updatedAt,
        readingTimeMinutes: article.readingTimeMinutes,
        body: article.body,
        seo: article.seo,
      },
    });
  }

  const articles = await content.getArticles();
  return NextResponse.json({
    count: articles.length,
    articles: articles.slice(0, limit).map((a) => ({
      slug: a.slug,
      title: a.title,
      summary: a.summary,
      category: a.category,
      tags: a.tags,
      authors: a.authors,
      publishedAt: a.publishedAt,
      readingTimeMinutes: a.readingTimeMinutes,
    })),
  });
}
