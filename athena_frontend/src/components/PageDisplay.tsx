import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import axios from 'axios';
import { IconButton, Box, HStack } from '@chakra-ui/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// interface PageDisplayProps {
//   pdfUrl: string;
// }

function PageDisplay() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber] = useState(1);
  const [currentPdfIndex, setCurrentPdfIndex] = useState(0);
  const [pdfFiles, setPdfFiles] = useState<{ filename: string }[]>([]);

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

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  function handlePreviousPdf() {
    setCurrentPdfIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  }

  function handleNextPdf() {
    setCurrentPdfIndex((prevIndex) => Math.min(prevIndex + 1, pdfFiles.length - 1));
  }

  return (
    <Box textAlign="center">
      <HStack justify="space-between" align="center" p={4}>
        <IconButton icon={<FaArrowLeft />} onClick={handlePreviousPdf} isDisabled={currentPdfIndex === 0} aria-label="Previous PDF" />
        <Box>
          {pdfFiles.length > 0 && (
            <Document
              file={`http://localhost:8000/pdf/${pdfFiles[currentPdfIndex].filename}`}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
          )}
          {numPages && (
            <p>
              Page {pageNumber} of {numPages}
            </p>
          )}
        </Box>
        <IconButton icon={<FaArrowRight />} onClick={handleNextPdf} isDisabled={currentPdfIndex === pdfFiles.length - 1} aria-label="Next PDF" />
      </HStack>
    </Box>
  );
}

export default PageDisplay;
