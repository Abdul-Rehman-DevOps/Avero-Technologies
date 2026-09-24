/**
 * Route-level loading UI, Signal Apex spinner (no full-screen takeover).
 */
export default function Loading() {
  return (
    <div className="avero-route-load" role="status" aria-live="polite" aria-label="Loading page">
      <div className="avero-route-load__card">
        <svg viewBox="0 0 64 64" className="avero-route-load__mark" aria-hidden>
          <rect width="64" height="64" rx="14" fill="#07111f" />
          <rect className="avero-boot__beam" x="8" y="34" width="48" height="5.5" rx="1.5" fill="#0d8f9c" />
          <path
            fill="#ffffff"
            d="M32 12.5 14 51h8.2l3.4-8.2h12.8L41.8 51H50L32 12.5Zm0 14.2 4.6 11.1H27.4L32 26.7Z"
          />
          <circle className="avero-boot__node" cx="32" cy="10" r="2.8" fill="#0d8f9c" />
        </svg>
        <p className="tech-label text-signal">Loading</p>
        <div className="avero-boot__track mt-4 w-40" aria-hidden>
          <div className="avero-boot__fill" />
        </div>
      </div>
    </div>
  );
}
