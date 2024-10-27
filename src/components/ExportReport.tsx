// src/components/ExportReport.tsx

import React from 'react';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs} from 'file-saver';

const ExportReport: React.FC = () => {
  const sampleText = "This is a sample report text to be exported in PDF or Word format.";

  // Function to export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text(sampleText, 10, 10);
    doc.save("report.pdf");
  };

  // Function to export as Word document
  const exportWord = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: sampleText,
                  bold: true,
                }),
              ],
            }),
          ],
        },
      ],
    });

    const buffer = await Packer.toBlob(doc);
    saveAs(buffer, "report.docx");
  };

  return (
    <div>
      <h2>Export Report</h2>
      <p>{sampleText}</p>
      <button onClick={exportPDF}>Export as PDF</button>
      <button onClick={exportWord}>Export as Word</button>
    </div>
  );
};

export default ExportReport;
