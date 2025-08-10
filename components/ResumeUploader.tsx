// components/ResumeUploader.tsx
import React, { useState } from 'react';

interface ResumeUploaderProps {
  onUploadComplete: () => void;
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setMessage('');
    setError(null);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await fetch('/api/parse-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to parse resume');
      }

      // Success! Set a success message and then call the callback.
      setMessage('Resume uploaded and parsed successfully!');
      // Assuming a short delay before navigating back for better user experience
      setTimeout(() => onUploadComplete(), 2000); 

    } catch (err) {
      setError(err.message);
      setLoading(false); // Stop loading on error
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleUpload} className="space-y-4">
        <input 
          type="file" 
          accept=".pdf,.doc,.docx" 
          onChange={handleFileChange} 
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <button 
          type="submit" 
          disabled={!file || loading}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg disabled:bg-blue-300"
        >
          {loading ? 'Processing...' : 'Parse Resume'}
        </button>
      </form>

      {message && <div className="mt-4 text-green-600">{message}</div>}
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

export default ResumeUploader;