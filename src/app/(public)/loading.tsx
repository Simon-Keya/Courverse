export default function PublicLoading() {
  return (
    <div className="container-page py-20">
      <div className="animate-pulse space-y-8">
        <div className="h-8 w-64 rounded-md bg-background-secondary" />
        <div className="h-4 w-full max-w-md rounded-md bg-background-secondary" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-card border border-border">
              <div className="aspect-video w-full rounded-t-card bg-background-secondary" />
              <div className="space-y-2 p-5">
                <div className="h-4 w-3/4 rounded bg-background-secondary" />
                <div className="h-4 w-1/2 rounded bg-background-secondary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
