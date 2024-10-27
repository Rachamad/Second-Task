// src/App.tsx

import React from 'react';
import Login from './components/Login';
import DocumentEditor from './components/DocumentEditor';
import ExportReport from './components/ExportReport';
import OcrScanner from './components/OcrScanner';
import CodeGenerator from './components/CodeGenerator';
import PincodeFetcher from './components/PincodeFetcher'; // Import the PincodeFetcher component
import './components/Login.css'; // Import the CSS file

const App: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Application</h1>
      
      {/* Render the Login Component */}
      <Login />
      
      {/* Render the Document Editor */}
      <DocumentEditor />
      
      {/* Render the Export Report Component */}
      <ExportReport />
      
      {/* Render the OCR Scanner Component */}
      <OcrScanner />

      {/* Render the QR and Barcode Generator */}
      <CodeGenerator />

      {/* Render the Pincode Fetcher Component */}
      <PincodeFetcher />
    </div>
  );
};

export default App;
