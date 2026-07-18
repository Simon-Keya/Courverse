"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CourseDetailError({
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
    <div className="container-page flex flex-col items-center justify-center gap-4 py-24 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-error">
        <AlertTriangle className="h-7 w-7" />
      </span>
      <h1 className="font-heading text-2xl font-bold text-text">This course couldn't load</h1>
      <p className="max-w-md text-text-secondary">
        Something went wrong while fetching this course. Try again, or head back to browse other courses.
      </p>
      <div className="mt-2 flex items-center gap-3">
        <Button onClick={() => reset()}>Try again</Button>
        <Link href="/courses">
          <Button variant="secondary">Browse courses</Button>
        </Link>
      </div>
    </div>
  );
}
