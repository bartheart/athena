import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Ensure the worker is loaded from the correct path
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function MyApp() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [currentPdfIndex, setCurrentPdfIndex] = useState(0);
  const [pdfFiles, setPdfFiles] = useState([]);

  useEffect(() => {
    const fetchPdfFiles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/pdf_files');
        setPdfFiles(response.data);
      } catch (error) {
        console.error('Error fetching PDF files:', error);
      }
    };
    fetchPdfFiles();
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function handlePreviousPdf() {
    setCurrentPdfIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  }

  function handleNextPdf() {
    setCurrentPdfIndex((prevIndex) => Math.min(prevIndex + 1, pdfFiles.length - 1));
  }

  return (
    <div className='pdf-container'>
      <div className="arrows-container">
        <FaArrowLeft className="arrow-left" onClick={handlePreviousPdf} disabled={currentPdfIndex === 0} />
      </div>
      <div className="pdf-content">
        {pdfFiles.length > 0 && (
          <Document
            file={`http://localhost:8000/pdf/${pdfFiles[currentPdfIndex].filename}`}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        )}
        {numPages && (
          <p className="page-counter">
            Page {pageNumber} of {numPages}
          </p>
        )}
      </div>
      <div className="arrows-container">
        <FaArrowRight className="arrow-right" onClick={handleNextPdf} disabled={currentPdfIndex === pdfFiles.length - 1} />
      </div>
    </div>
  );
}

export default MyApp;
