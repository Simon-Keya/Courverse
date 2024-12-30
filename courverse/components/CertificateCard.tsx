import Link from "next/link"; // Ensure you import Link from next/link
import { FC } from "react"; // Ensure you import FC from react

interface CertificateCardProps {
  title: string;
  issuedBy: string;
  dateIssued: string;
  certificateId: string;
}

const CertificateCard: FC<CertificateCardProps> = ({ title, issuedBy, dateIssued, certificateId }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="text-gray-500 mt-2">Issued by: {issuedBy}</p>
      <p className="text-sm text-gray-400">Issued on: {new Date(dateIssued).toLocaleDateString()}</p>
      <Link href={`/certificates/${certificateId}`}>
        <a className="btn btn-primary mt-4">View Certificate</a>
      </Link>
    </div>
  );
};

export default CertificateCard;
