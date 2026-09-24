/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CapabilityOrthograph } from "@/components/visual/CapabilityOrthograph";
import type { Capability } from "@/types/content";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

const caps = [
  {
    id: "ai",
    slug: "ai",
    name: "Avero AI",
    shortName: "AI",
    summary: "AI summary",
    mandate: "m",
    capabilities: ["Generative AI", "Agents"],
    relatedServiceSlugs: [],
    status: "active",
    visibility: "public",
    seo: { title: "AI", description: "d" },
  },
  {
    id: "cloud",
    slug: "cloud",
    name: "Avero Cloud",
    shortName: "Cloud",
    summary: "Cloud summary",
    mandate: "m",
    capabilities: ["AWS", "Azure"],
    relatedServiceSlugs: [],
    status: "active",
    visibility: "public",
    seo: { title: "Cloud", description: "d" },
  },
] as Capability[];

describe("CapabilityOrthograph", () => {
  it("switches the detail panel when a domain control is clicked", async () => {
    const user = userEvent.setup();
    render(<CapabilityOrthograph capabilities={caps} />);

    expect(screen.getByRole("heading", { name: "Avero AI" })).toBeInTheDocument();

    await user.click(screen.getByRole("option", { name: /Cloud/i }));

    expect(await screen.findByRole("heading", { name: "Avero Cloud" })).toBeInTheDocument();
    expect(screen.getByText("Cloud summary")).toBeInTheDocument();
  });
});
