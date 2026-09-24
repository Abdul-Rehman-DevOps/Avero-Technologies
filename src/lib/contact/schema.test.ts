import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contact/schema";
import { isPublic } from "@/lib/content/repository";
import { rateLimit } from "@/lib/contact/rate-limit";

const validBase = {
  name: "Ada Lovelace",
  workEmail: "ada@contoso.com",
  company: "Contoso",
  role: "CTO",
  lookingToBuild: "A secure multi-account cloud platform",
  projectType: "security" as const,
  timeline: "1-3m" as const,
  budget: "",
  message: "We need a secure cloud platform review for a multi-account estate.",
  website: "",
};

describe("contactSchema", () => {
  it("accepts a valid payload", () => {
    const result = contactSchema.safeParse(validBase);
    expect(result.success).toBe(true);
  });

  it("rejects short messages with a clear message", () => {
    const result = contactSchema.safeParse({
      ...validBase,
      projectType: "ai",
      message: "Too short",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toMatch(/context|short paragraph/i);
    }
  });

  it("requires lookingToBuild and timeline with friendly copy", () => {
    const rest = {
      name: validBase.name,
      workEmail: validBase.workEmail,
      company: validBase.company,
      role: validBase.role,
      projectType: validBase.projectType,
      budget: validBase.budget,
      message: validBase.message,
      website: validBase.website,
    };
    const result = contactSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.issues.map((i) => i.message).join(" ");
      expect(messages).not.toMatch(/Too small|Invalid option|expected one of/i);
    }
  });

  it("asks for area and company in plain language", () => {
    const result = contactSchema.safeParse({
      ...validBase,
      company: "",
      projectType: "",
      timeline: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const byPath = Object.fromEntries(
        result.error.issues.map((i) => [i.path.join("."), i.message]),
      );
      expect(byPath.company).toBe("Company is required");
      expect(byPath.projectType).toBe("Please select an area");
      expect(byPath.timeline).toBe("Please select a timeline");
    }
  });
});

describe("visibility", () => {
  it("only treats public as public", () => {
    expect(isPublic("public")).toBe(true);
    expect(isPublic("draft")).toBe(false);
    expect(isPublic("internal")).toBe(false);
  });
});

describe("rateLimit", () => {
  it("blocks after max requests", () => {
    const key = `test-${Date.now()}`;
    expect(rateLimit(key, 2, 60_000).ok).toBe(true);
    expect(rateLimit(key, 2, 60_000).ok).toBe(true);
    expect(rateLimit(key, 2, 60_000).ok).toBe(false);
  });
});
