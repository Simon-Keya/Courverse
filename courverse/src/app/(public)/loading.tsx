import {
  BookOpen,
  GraduationCap,
  LoaderCircle,
  Sparkles,
} from "lucide-react";

export default function PublicLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-8">

        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/15" />

          <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl">

            <GraduationCap className="h-12 w-12" />

          </div>
        </div>

        <div className="space-y-3 text-center">

          <h2 className="text-3xl font-bold">
            Loading Courverse...
          </h2>

          <p className="max-w-md text-muted-foreground">
            Preparing your personalized learning experience.
          </p>

        </div>

        <LoaderCircle className="h-8 w-8 animate-spin text-primary" />

        <div className="grid grid-cols-3 gap-6 pt-8">

          <div className="flex flex-col items-center gap-2">

            <BookOpen className="h-7 w-7 text-emerald-500 animate-bounce" />

            <div className="h-2 w-20 rounded-full bg-muted animate-pulse" />

          </div>

          <div className="flex flex-col items-center gap-2">

            <GraduationCap
              className="h-7 w-7 text-blue-500 animate-bounce"
              style={{ animationDelay: ".2s" }}
            />

            <div className="h-2 w-20 rounded-full bg-muted animate-pulse" />

          </div>

          <div className="flex flex-col items-center gap-2">

            <Sparkles
              className="h-7 w-7 text-yellow-500 animate-bounce"
              style={{ animationDelay: ".4s" }}
            />

            <div className="h-2 w-20 rounded-full bg-muted animate-pulse" />

          </div>

        </div>
      </div>
    </main>
  );
}