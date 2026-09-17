"use client";

import { Award, Download, Share2, Loader2 } from "lucide-react";
import { useMyCertificates } from "@/hooks/use-courses";
import { useAuthStore } from "@/store/auth.store";
import Link from "next/link";
import { certificates as mockCerts } from "@/data/mock";
import { isDemoMode } from "@/lib/demo";

export default function CertificatesPage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { data, isLoading, isError } = useMyCertificates();

  const certs =
    data?.length
      ? data
      : isError || (!isLoading && !data)
        ? mockCerts.map((c: any) => ({
            id: c.id,
            credentialId: c.credentialId,
            courseTitle: c.courseTitle,
            publisherName: c.publisher,
            issuedAt: c.issuedDate,
            recipientName: c.recipientName || "Learner",
          }))
        : [];

  if (!isAuthenticated && !isLoading) {
    return (
      <div className="container-page py-16 text-center">
        <Award className="mx-auto h-12 w-12 text-text-secondary" />
        <h1 className="mt-4 font-heading text-2xl font-bold text-text">Certificates</h1>
        <p className="mt-2 text-text-secondary">Log in to view your certificates.</p>
        <Link href="/login" className="mt-6 inline-block text-primary hover:underline">
          Log in
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Certificates</h1>
      <p className="mt-1 text-text-secondary">
        {isLoading ? "Loading…" : `${certs.length} certificates earned.`}
        {isError && <span className="ml-2 text-xs text-amber-600">(demo data)</span>}
      </p>

      {isLoading ? (
        <div className="mt-16 flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : certs.length === 0 ? (
        <div className="mt-10 rounded-card border border-dashed border-border py-16 text-center">
          <p className="font-heading font-semibold text-text">No certificates yet</p>
          <p className="mt-1 text-sm text-text-secondary">
            Finish a course to earn your first certificate.
          </p>
          <Link href="/courses" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
            Browse courses
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {certs.map((cert: any) => (
            <div
              key={cert.id}
              className="overflow-hidden rounded-card border border-border bg-white shadow-sm"
            >
              <div className="relative border-b-4 border-primary bg-gradient-to-br from-primary-light to-white p-8 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                  <Award className="h-6 w-6" />
                </span>
                <p className="mt-3 text-xs uppercase tracking-widest text-text-secondary">
                  Certificate of Completion
                </p>
                <p className="mt-2 font-heading text-lg font-bold text-text">
                  {cert.courseTitle || cert.course?.title || "Course"}
                </p>
                <p className="mt-1 text-xs text-text-secondary">
                  Issued by {cert.publisherName || cert.course?.publisher?.name || "Courverse"}
                </p>
                {cert.recipientName && (
                  <p className="mt-3 text-sm font-medium text-text">{cert.recipientName}</p>
                )}
              </div>

              <div className="flex items-center justify-between p-5">
                <div>
                  <p className="text-xs text-text-secondary">
                    Issued{" "}
                    {cert.issuedAt
                      ? new Date(cert.issuedAt).toLocaleDateString()
                      : cert.issuedDate || "—"}
                  </p>
                  <p className="text-xs text-text-secondary">
                    Credential ID: {cert.credentialId}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    aria-label="Share certificate"
                    className="rounded-full border border-border p-2 text-text-secondary hover:bg-background-secondary"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button
                    aria-label="Download certificate"
                    className="rounded-full border border-border p-2 text-text-secondary hover:bg-background-secondary"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
