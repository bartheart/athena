import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Button, Container, Input, Text, VStack } from '@chakra-ui/react';
import PageDisplay from '@components/PageDisplay';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string>('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);

    const file = event.target.files?.[0];
    setSelectedFile(file || null);

    if (file) {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
    }
  };

  const handleUpload = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(selectedFile);
    alert('File uploaded successfully');
  };

  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  return (
    <Container p={4}>
      <form onSubmit={handleUpload}>
        <VStack spacing={4}>
          <Input type="file" accept="application/pdf" onChange={handleFileChange} />
          {selectedFile && <Text>File selected: {selectedFile.name}</Text>}
          <Button type="submit" colorScheme="blue">Upload</Button>
        </VStack>
      </form>
      {pdfUrl && <PageDisplay />}
    </Container>
  );
}

export default FileUpload;
