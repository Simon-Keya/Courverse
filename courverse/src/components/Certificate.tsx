import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Certificate: React.FC = () => {
  const downloadCertificate = () => {
    const input = document.getElementById('certificate') as HTMLElement;
    if (!input) return;

    html2canvas(input).then((canvas: HTMLCanvasElement) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape');
      pdf.addImage(imgData, 'PNG', 10, 10, 280, 210); // adjust dimensions as needed
      pdf.save('certificate.pdf');
    }).catch(error => {
      console.error('Error generating the certificate:', error);
    });
  };

  return (
    <div>
      <div id="certificate">
        {/* Your certificate content here */}
        <h1>Certificate of Completion</h1>
        <p>This certifies that the student has successfully completed the course.</p>
      </div>
      <button onClick={downloadCertificate}>Download Certificate</button>
    </div>
  );
};

export default Certificate;
