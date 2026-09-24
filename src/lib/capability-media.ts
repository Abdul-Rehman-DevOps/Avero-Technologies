import type { MediaKey } from "@/lib/media";

/** Map capability domains to photography themes. */
export function mediaForCapability(capability: string): MediaKey {
  switch (capability) {
    case "ai":
      return "ai";
    case "engineering":
      return "engineering";
    case "cloud":
      return "cloud";
    case "platform":
      return "delivery";
    case "security":
      return "security";
    case "data":
      return "data";
    case "labs":
      return "engineering";
    default:
      return "office";
  }
}

export function tabMediaForSection(
  section: "problem" | "context" | "approach" | "purpose" | "security" | "scope" | "tech",
  capability: string,
): MediaKey {
  const base = mediaForCapability(capability);
  switch (section) {
    case "problem":
      return "office";
    case "context":
      return "team";
    case "approach":
      return base;
    case "purpose":
      return "delivery";
    case "security":
      return "security";
    case "scope":
      return "engineering";
    case "tech":
      return base;
    default:
      return base;
  }
}
