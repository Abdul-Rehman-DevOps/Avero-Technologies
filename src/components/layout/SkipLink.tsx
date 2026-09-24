import Link from "next/link";

export function SkipLink() {
  return (
    <Link
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-paper focus:px-4 focus:py-2 focus:shadow-md"
    >
      Skip to content
    </Link>
  );
}
