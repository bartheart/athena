import React, { useState, useEffect } from 'react';
import PageDisplay from './PageDisplay.jsx';



const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');

  const handleFileChange = (event) => {
    // Clean up the previous URL
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);

    const file = event.target.files[0];
    setSelectedFile(file);

    const url = URL.createObjectURL(file);
    setPdfUrl(url);
  };

  const handleUpload = (event) => {
    event.preventDefault();
    // Handle the file upload process here
    console.log(selectedFile);
    alert('File uploaded successfully');
  };

  // Clean up the blob URL when the component is unmounted
  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  return (
    <div className="flex flex-col items-center justify-center container p-4">
      <form onSubmit={handleUpload} className="flex flex-col space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Upload PDF
          <input
            type="file"
            accept="application/pdf"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm p-2"
            onChange={handleFileChange}
          />
        </label>
        {selectedFile && (
          <span className="text-sm text-gray-500">
            File selected: {selectedFile.name}
          </span>
        )}
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
      {pdfUrl && <PageDisplay pdfUrl={pdfUrl} />}
    </div>
  );
};

export default FileUpload;
