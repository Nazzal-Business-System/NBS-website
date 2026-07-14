export function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 nbs-ambient-base" />
      <div className="absolute inset-0 nbs-grid-overlay" />
      <div className="absolute inset-0 nbs-data-flow" />
    </div>
  );
}
