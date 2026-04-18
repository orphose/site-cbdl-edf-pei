import { Skeleton } from "@nextui-org/react";

export default function ArticleSkeleton() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      className="pt-[72px] md:pt-[100px]"
    >
      <span className="sr-only">Chargement de l&apos;article…</span>
      <div className="container-custom py-12">
        <Skeleton className="h-8 w-32 mb-8" />
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-48 mb-8" />
        <Skeleton className="h-96 w-full mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}
