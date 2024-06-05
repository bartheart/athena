import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import PageDisplay from './PageDisplay.jsx';
import '../views/Dashboard/Dashboard.css';

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the currently displayed file index

  const onDrop = useCallback(acceptedFiles => {
    const mappedFiles = acceptedFiles.map(file => ({
      ...file,
      preview: URL.createObjectURL(file)
    }));
    setFiles(currentFiles => [...currentFiles, ...mappedFiles]);
    setCurrentIndex(0); // Reset index when new files are dropped
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'application/pdf', multiple: true });

  const handleUpload = (event) => {
    event.preventDefault();
    // Handle the file upload process here, such as uploading to a server
    console.log(files);
    alert('Files uploaded successfully');
  };

  // Clean up previews on unmount
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

  const currentFile = files[currentIndex] || null; // Get the currently displayed file

  return (
    <div className="drag-container p-4">
      <div>
        <h2>Student Submissions</h2>
      </div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or <button className="browse-button">Browse Files</button></p>
        }
      </div>
      <form onSubmit={handleUpload} className="flex flex-col space-y-4">
        {currentFile && (
          <div>
            <span>File selected: {currentFile.name}</span>
            <PageDisplay pdfUrl={currentFile.preview} />
          </div>
        )}
        <button type="submit" className="upload-button">Upload Files</button>
      </form>
    </div>
  );
};

export default FileUpload;
