// utils/certificates.ts
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase'; // Corrected import

export const getCertificateById = async (id: string) => {
  const certificateRef = doc(db, 'certificates', id); // Use `db` instead of `firestore`
  const certificateSnap = await getDoc(certificateRef);

  if (certificateSnap.exists()) {
    return certificateSnap.data();
  } else {
    throw new Error('Certificate not found');
  }
};
