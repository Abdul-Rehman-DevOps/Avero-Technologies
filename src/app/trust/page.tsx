import { permanentRedirect } from "next/navigation";

/** Legacy path. Certifications are not published; redirect away from empty trust theater. */
export default function TrustPage() {
  permanentRedirect("/about");
}
