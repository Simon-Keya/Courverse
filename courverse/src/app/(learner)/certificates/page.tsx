"use client";

import { Award, Loader2 } from "lucide-react";
import { useMyCertificates } from "@/hooks/use-courses";

export default function CertificatesPage() {
  const { data, isLoading, isError, refetch } = useMyCertificates();
  const list = data ?? [];

  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Certificates</h1>
      <p className="mt-1 text-text-secondary">Credentials you have earned.</p>

      {isLoading && (
        <div className="mt-10 flex items-center gap-2 text-text-secondary">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      )}
      {isError && (
        <div className="mt-8">
          <p className="text-sm text-text-secondary">Could not load certificates.</p>
          <button type="button" className="btn-primary mt-3" onClick={() => refetch()}>
            Retry
          </button>
        </div>
      )}
      {!isLoading && !isError && list.length === 0 && (
        <div className="mt-10 rounded-card border border-border bg-card p-10 text-center">
          <Award className="mx-auto h-8 w-8 text-primary" />
          <p className="mt-3 font-medium text-text">No certificates yet</p>
          <p className="mt-1 text-sm text-text-secondary">
            Complete a course to earn your first credential.
          </p>
        </div>
      )}
      <ul className="mt-6 divide-y divide-border rounded-card border border-border bg-card">
        {list.map((c: { id: string; courseTitle?: string; issuedAt?: string; credentialId?: string }) => (
          <li key={c.id} className="px-5 py-4">
            <p className="font-medium text-text">{c.courseTitle ?? "Certificate"}</p>
            <p className="text-xs text-text-secondary">
              {c.credentialId ? `ID: ${c.credentialId}` : ""}
              {c.issuedAt ? ` · ${c.issuedAt}` : ""}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
