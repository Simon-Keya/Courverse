"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CoursePlayerError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-error">
        <AlertTriangle className="h-7 w-7" />
      </span>
      <h1 className="font-heading text-2xl font-bold text-text">We lost your place</h1>
      <p className="max-w-md text-text-secondary">
        Something went wrong loading this lesson. Your progress up to your last completed lesson is safe.
      </p>
      <div className="mt-2 flex items-center gap-3">
        <Button onClick={() => reset()}>Try again</Button>
        <Link href="/my-learning">
          <Button variant="secondary">Back to My Learning</Button>
        </Link>
      </div>
    </div>
  );
}
