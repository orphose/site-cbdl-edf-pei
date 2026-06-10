export default function ArticleSkeleton() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      className="pt-16 md:pt-20"
    >
      <span className="sr-only">Chargement de l&apos;article…</span>
      <div className="container-custom py-12">
        <div className="img-skeleton h-8 w-32 mb-8" />
        <div className="img-skeleton h-12 w-3/4 mb-4" />
        <div className="img-skeleton h-6 w-48 mb-8" />
        <div className="img-skeleton h-96 w-full mb-8" />
        <div className="space-y-4">
          <div className="img-skeleton h-4 w-full" />
          <div className="img-skeleton h-4 w-full" />
          <div className="img-skeleton h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}
