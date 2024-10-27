// src/components/OcrScanner.tsx

import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const OcrScanner: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [recognizedText, setRecognizedText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setImage(file);
    }
  };

  const handleScan = () => {
    if (!image) {
      alert("Please upload an image first.");
      return;
    }

    setLoading(true);
    setError('');
    setRecognizedText('');

    // Use Tesseract.js to recognize text
    Tesseract.recognize(
      image,
      'eng', // Language
      {
        logger: (info) => console.log(info) // Debug prints
      }
    ).then(({ data: { text } }) => {
      setRecognizedText(text);
      setLoading(false);
    }).catch(err => {
      setError('Error processing the image');
      console.error(err);
      setLoading(false);
    });
  };

  return (
    <div>
      <h2>OCR Scanner</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleScan} disabled={!image || loading}>
        {loading ? 'Scanning...' : 'Scan Image'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {recognizedText && (
        <div>
          <h3>Recognized Text:</h3>
          <p>{recognizedText}</p>
        </div>
      )}
    </div>
  );
};

export default OcrScanner;
