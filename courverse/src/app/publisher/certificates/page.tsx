import { Award } from "lucide-react";
import { publisherCertificatesIssued } from "@/data/publisher-mock";

export default function PublisherCertificatesPage() {
  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Certificates issued</h1>
      <p className="mt-1 text-text-secondary">{publisherCertificatesIssued.length} certificates awarded to your students.</p>

      <div className="mt-6 card-surface divide-y divide-border">
        {publisherCertificatesIssued.map((c) => (
          <div key={c.id} className="flex items-center gap-4 px-6 py-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-50 text-reward">
              <Award className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium text-text">{c.learner}</p>
              <p className="text-xs text-text-secondary">{c.course}</p>
            </div>
            <p className="shrink-0 text-xs text-text-secondary">Issued {c.issuedDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
