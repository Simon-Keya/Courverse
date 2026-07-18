import { Award, Download, Share2 } from "lucide-react";
import { certificates } from "@/data/mock";

export default function CertificatesPage() {
  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Certificates</h1>
      <p className="mt-1 text-text-secondary">{certificates.length} certificates earned.</p>

      {certificates.length === 0 ? (
        <div className="mt-10 rounded-card border border-dashed border-border py-16 text-center">
          <p className="font-heading font-semibold text-text">No certificates yet</p>
          <p className="mt-1 text-sm text-text-secondary">Finish a course to earn your first certificate.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {certificates.map((cert) => (
            <div key={cert.id} className="overflow-hidden rounded-card border border-border bg-white shadow-sm">
              {/* Certificate preview */}
              <div className="relative border-b-4 border-primary bg-gradient-to-br from-primary-light to-white p-8 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-reward/20 text-reward">
                  <Award className="h-6 w-6" />
                </span>
                <p className="mt-3 text-xs uppercase tracking-widest text-text-secondary">Certificate of Completion</p>
                <p className="mt-2 font-heading text-lg font-bold text-text">{cert.courseTitle}</p>
                <p className="mt-1 text-xs text-text-secondary">Issued by {cert.publisher}</p>
              </div>

              <div className="flex items-center justify-between p-5">
                <div>
                  <p className="text-xs text-text-secondary">Issued {cert.issuedDate}</p>
                  <p className="text-xs text-text-secondary">Credential ID: {cert.credentialId}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button aria-label="Share certificate" className="rounded-full border border-border p-2 text-text-secondary hover:bg-background-secondary">
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button aria-label="Download certificate" className="rounded-full border border-border p-2 text-text-secondary hover:bg-background-secondary">
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
