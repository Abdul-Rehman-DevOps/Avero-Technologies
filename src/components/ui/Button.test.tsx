import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";

describe("Button", () => {
  it("renders a link button", () => {
    render(<Button href="/contact">Talk to us</Button>);
    expect(screen.getByRole("link", { name: "Talk to us" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });
});

describe("PlaceholderNotice", () => {
  it("announces placeholder status", () => {
    render(<PlaceholderNotice>Pending real content.</PlaceholderNotice>);
    expect(screen.getByRole("note")).toHaveTextContent("Content pending");
  });
});
