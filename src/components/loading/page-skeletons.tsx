import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/ui/container";

function CardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border-hairline bg-bg-elevated/20 p-5">
      <div className="flex items-start justify-between gap-4">
        <Skeleton className="h-6 w-36" rounded="md" />
        <Skeleton className="h-8 w-24" rounded="md" />
      </div>
      <Skeleton className="mt-4 h-12 w-full" rounded="md" />
      <div className="mt-6 flex flex-1 flex-col gap-2.5">
        <Skeleton className="h-4 w-[92%]" rounded="sm" />
        <Skeleton className="h-4 w-[84%]" rounded="sm" />
        <Skeleton className="h-4 w-[88%]" rounded="sm" />
        <Skeleton className="h-4 w-[70%]" rounded="sm" />
      </div>
      <div className="mt-6 flex gap-2 border-t border-border-hairline pt-4">
        <Skeleton className="h-10 w-36" rounded="full" />
        <Skeleton className="h-10 w-28" rounded="full" />
      </div>
    </div>
  );
}

function MediaSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border-hairline bg-bg-inset/40">
      <Skeleton className="aspect-[16/10] w-full" rounded="xl" />
      <div className="px-1 pt-3">
        <Skeleton className="h-3 w-3/4 max-w-sm" rounded="sm" />
      </div>
    </div>
  );
}

/** Lightweight homepage-shaped skeleton for soft navigations only. */
export function HomepageSkeleton() {
  return (
    <div
      className="nbs-page-skeleton py-[var(--spacing-section-y)]"
      aria-busy="true"
      aria-live="polite"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-3 w-40" rounded="sm" />
            <Skeleton className="h-10 w-[90%] max-w-lg" rounded="md" />
            <Skeleton className="h-10 w-[75%] max-w-md" rounded="md" />
            <Skeleton className="mt-2 h-16 w-full max-w-lg" rounded="md" />
            <div className="mt-4 flex gap-3">
              <Skeleton className="h-11 w-40" rounded="full" />
              <Skeleton className="h-11 w-32" rounded="full" />
            </div>
          </div>
          <MediaSkeleton />
        </div>

        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-border-hairline bg-bg-elevated/15 p-5"
            >
              <Skeleton className="size-10" rounded="lg" />
              <Skeleton className="mt-4 h-5 w-3/4" rounded="md" />
              <Skeleton className="mt-3 h-14 w-full" rounded="md" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

/** Pricing page-shaped skeleton matching product packs + add-ons. */
export function PricingPageSkeleton() {
  return (
    <div
      className="nbs-page-skeleton py-14 sm:py-16"
      aria-busy="true"
      aria-live="polite"
    >
      <Container>
        <div className="max-w-2xl">
          <Skeleton className="h-3 w-24" rounded="sm" />
          <Skeleton className="mt-3 h-9 w-[85%]" rounded="md" />
          <Skeleton className="mt-4 h-14 w-full" rounded="md" />
          <Skeleton className="mt-4 h-10 w-[90%]" rounded="md" />
        </div>

        <div className="mt-14">
          <Skeleton className="h-3 w-28" rounded="sm" />
          <Skeleton className="mt-3 h-8 w-56" rounded="md" />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <Skeleton className="h-3 w-32" rounded="sm" />
          <Skeleton className="mt-3 h-8 w-64" rounded="md" />
          <div className="mt-8 flex flex-col gap-0 border-t border-border-hairline">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 border-b border-border-hairline py-4"
              >
                <div className="min-w-0 flex-1">
                  <Skeleton className="h-5 w-40" rounded="md" />
                  <Skeleton className="mt-2 h-4 w-[80%]" rounded="sm" />
                </div>
                <Skeleton className="h-5 w-24 shrink-0" rounded="md" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export function ContactPageSkeleton() {
  return (
    <div
      className="nbs-page-skeleton py-14 sm:py-16"
      aria-busy="true"
      aria-live="polite"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <div>
            <Skeleton className="h-3 w-24" rounded="sm" />
            <Skeleton className="mt-3 h-9 w-64" rounded="md" />
            <Skeleton className="mt-4 h-16 w-full max-w-md" rounded="md" />
          </div>
          <div className="flex flex-col gap-4 rounded-xl border border-border-hairline bg-bg-elevated/20 p-5 sm:p-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-2">
                <Skeleton className="h-3 w-24" rounded="sm" />
                <Skeleton className="h-11 w-full" rounded="lg" />
              </div>
            ))}
            <Skeleton className="mt-2 h-11 w-40" rounded="full" />
          </div>
        </div>
      </Container>
    </div>
  );
}
