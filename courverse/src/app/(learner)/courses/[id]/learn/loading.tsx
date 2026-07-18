export default function CoursePlayerLoading() {
  return (
    <div className="flex min-h-screen animate-pulse lg:flex-row">
      <aside className="hidden w-80 shrink-0 border-r border-border p-5 lg:block">
        <div className="h-4 w-2/3 rounded bg-background-secondary" />
        <div className="mt-6 h-2 w-full rounded-full bg-background-secondary" />
        <div className="mt-8 space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 w-full rounded-btn bg-background-secondary" />
          ))}
        </div>
      </aside>
      <main className="flex-1 px-8 py-10">
        <div className="mx-auto max-w-3xl">
          <div className="h-3 w-24 rounded bg-background-secondary" />
          <div className="mt-3 h-8 w-2/3 rounded bg-background-secondary" />
          <div className="mt-6 aspect-video w-full rounded-card bg-background-secondary" />
        </div>
      </main>
    </div>
  );
}
