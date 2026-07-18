export default function CourseDetailLoading() {
  return (
    <div className="animate-pulse">
      <div className="border-b border-border bg-background-secondary py-14">
        <div className="container-page grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4">
            <div className="h-4 w-40 rounded bg-white" />
            <div className="h-9 w-3/4 rounded bg-white" />
            <div className="h-4 w-full max-w-lg rounded bg-white" />
            <div className="h-4 w-2/3 rounded bg-white" />
          </div>
          <div className="aspect-video w-full rounded-card bg-white" />
        </div>
      </div>
      <div className="container-page py-16">
        <div className="h-6 w-40 rounded bg-background-secondary" />
        <div className="mt-6 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 w-full rounded-card bg-background-secondary" />
          ))}
        </div>
      </div>
    </div>
  );
}
