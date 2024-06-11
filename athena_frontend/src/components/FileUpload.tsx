import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Text, VStack, Heading } from '@chakra-ui/react';
import PageDisplay from '@components/PageDisplay';
import axios from 'axios';

interface FileWithPreview extends File {
  preview: string;
}

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const mappedFiles = acceptedFiles.map(file => ({
      ...file,
      preview: URL.createObjectURL(file)
    }));
    setFiles(currentFiles => [...currentFiles, ...mappedFiles]);
    setCurrentIndex(0);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: true
  });

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    // Handle the file upload process here, such as uploading to a server
    const formData = new FormData();
    formData.append('student_id', '123'); // Replace with actual student ID
    if (files.length > 0) {
      formData.append('file', files[0]);
    }

    try {
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Files uploaded successfully');
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('File upload failed');
    }
  };

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < files.length - 1) {
      setCurrentIndex(prevState => prevState + 1);
    }
  };

  const currentFile = files[currentIndex] || null;

  return (
    <Box p={4}>
      <VStack spacing={4} align="center">
        <Heading size="md">Student Submissions</Heading>
        <Box
          {...getRootProps()}
          borderWidth={2}
          borderRadius="lg"
          borderColor={isDragActive ? 'blue.300' : 'gray.300'}
          p={4}
          cursor="pointer"
          w="100%"
          textAlign="center"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <Text>Drop the files here ...</Text>
          ) : (
            <Text>
              Drag 'n' drop some files here, or{' '}
              <Button colorScheme="blue" size="sm" variant="outline">
                Browse Files
              </Button>
            </Text>
          )}
        </Box>
        <form onSubmit={handleUpload} style={{ width: '100%' }}>
          {currentFile && (
            <Box>
              <Text>File selected: {currentFile.name}</Text>
              <PageDisplay pdfUrl={currentFile.preview} />
            </Box>
          )}
          <Button type="submit" colorScheme="blue" mt={4} w="100%">
            Upload Files
          </Button>
        </form>
        <Box display="flex" justifyContent="space-between" w="100%">
          <Button onClick={handlePrevious} disabled={currentIndex === 0}>
            Previous
          </Button>
          <Button onClick={handleNext} disabled={currentIndex === files.length - 1}>
            Next
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default FileUpload;
