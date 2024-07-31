import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { getCertificateById } from '../utils/certificate'; // Ensure this function is implemented in utils/certificates.ts

interface CertificateProps {
  certificate: {
    id: string;
    title: string;
    description: string;
    issuedDate: string;
  };
}

const Certificate: React.FC<CertificateProps> = ({ certificate }) => {
  const router = useRouter();

  // Optional: Redirect if no certificate is found or handle it accordingly
  if (!certificate) {
    return <div>No Certificate Found</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6">Certificate Details</h2>
        <div className="mb-4">
          <h3 className="text-2xl font-semibold mb-2">{certificate.title}</h3>
          <p className="text-gray-700 mb-2">{certificate.description}</p>
          <p className="text-gray-500">Issued Date: {certificate.issuedDate}</p>
        </div>
        <button onClick={() => router.back()} className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Back
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { certificateId } = context.query;

  if (typeof certificateId !== 'string') {
    return {
      notFound: true,
    };
  }

  try {
    const certificate = await getCertificateById(certificateId);
    return {
      props: {
        certificate,
      },
    };
  } catch (error) {
    console.error('Failed to fetch certificate:', error);
    return {
      notFound: true,
    };
  }
};

export default Certificate;
