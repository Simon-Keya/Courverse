import { jsPDF } from 'jspdf';

export const generateCertificate = (name: string, course: string): void => {
  const doc = new jsPDF();
  doc.text(`Certificate of Completion`, 20, 20);
  doc.text(`This certifies that ${name} has successfully completed the course ${course}`, 20, 30);
  doc.save(`${name}_certificate.pdf`);
};
