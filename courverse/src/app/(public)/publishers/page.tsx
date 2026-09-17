"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { usePublishers } from "@/hooks/use-catalog";

export default function PublishersPage() {
  const { data, isLoading, isError, refetch } = usePublishers();
  const publishers = data ?? [];

  return (
    <>
      <section className="border-b border-border bg-background-secondary py-16">
        <div className="container-page">
          <h1 className="font-heading text-4xl font-bold text-text sm:text-5xl">
            Publishers
          </h1>
          <p className="mt-4 max-w-xl text-lg text-text-secondary">
            Learn from verified instructors and organizations on Courverse.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        {isLoading && (
          <div className="flex items-center justify-center gap-2 py-20 text-text-secondary">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading publishers…
          </div>
        )}
        {isError && (
          <div className="rounded-card border border-border bg-card p-8 text-center">
            <p className="font-heading text-lg font-semibold text-text">
              Could not load publishers
            </p>
            <button type="button" className="btn-primary mt-4" onClick={() => refetch()}>
              Retry
            </button>
          </div>
        )}
        {!isLoading && !isError && publishers.length === 0 && (
          <div className="rounded-card border border-border bg-card p-8 text-center text-text-secondary">
            No publishers yet.
          </div>
        )}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {publishers.map((p) => (
            <Link
              key={p.id}
              href={`/publishers/${p.id}`}
              className="card-surface p-5 transition hover:-translate-y-0.5"
            >
              <h2 className="font-heading text-lg font-semibold text-text">{p.name}</h2>
              {p.bio && (
                <p className="mt-2 line-clamp-3 text-sm text-text-secondary">{p.bio}</p>
              )}
              <p className="mt-3 text-xs text-text-secondary">
                {p.courseCount ?? 0} courses
                {p.isVerified ? " · Verified" : ""}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
