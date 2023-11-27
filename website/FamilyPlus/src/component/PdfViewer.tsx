// PdfViewer.tsx
import React, { useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { Document, Page } from 'react-pdf';

interface PdfViewerProps {
  pdfData: string | undefined;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfData }) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <Box flex="1" p="4">
      {pdfData ? (
        <>
          <Heading mb="4">PDF Viewer</Heading>
          <Document file={{ data: pdfData }} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </>
      ) : (
        <Text>Select a record to view</Text>
      )}
    </Box>
  );
};

export default PdfViewer;
