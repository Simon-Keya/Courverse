"use client"
import axios from "axios";
import { useEffect, useState } from "react";

// Define the Certificate type for TypeScript
interface Certificate {
  id: string;
  title: string;
  description: string;
  date: string;
  url: string; // URL for downloading the certificate (if applicable)
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCertificates() {
      try {
        const response = await axios.get("/api/user/certificates");
        setCertificates(response.data.certificates);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching certificates:", error);
        setError("Failed to load certificates. Please try again later.");
        setLoading(false);
      }
    }
    fetchCertificates();
  }, []);

  const handleDownload = (url: string) => {
    // Logic to handle certificate download
    window.location.href = url;
  };

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex justify-center items-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center">My Certificates</h1>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate) => (
            <div key={certificate.id} className="card shadow-lg bg-base-200">
              <div className="card-body">
                <h2 className="text-xl font-semibold">{certificate.title}</h2>
                <p className="text-sm text-gray-500">{certificate.description}</p>
                <p className="text-sm text-gray-400">{new Date(certificate.date).toLocaleDateString()}</p>
                <button
                  className="btn btn-primary mt-4"
                  onClick={() => handleDownload(certificate.url)}
                >
                  Download Certificate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
