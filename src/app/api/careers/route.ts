import { NextResponse } from "next/server";
import { content } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const status = searchParams.get("status") ?? "open";

  if (slug) {
    const job = await content.getJob(slug);
    if (!job || job.visibility !== "public") {
      return NextResponse.json({ error: "That role was not found." }, { status: 404 });
    }
    return NextResponse.json({ job });
  }

  const jobs = await content.getJobs();
  const filtered =
    status === "all"
      ? jobs
      : jobs.filter((j) => j.status === status && j.visibility === "public");

  return NextResponse.json({
    count: filtered.length,
    jobs: filtered.map((j) => ({
      slug: j.slug,
      title: j.title,
      department: j.department,
      locationType: j.locationType,
      locations: j.locations,
      employmentType: j.employmentType,
      seniority: j.seniority,
      status: j.status,
      publishedAt: j.publishedAt,
      summary: j.description.slice(0, 180),
    })),
  });
}
