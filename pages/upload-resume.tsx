// pages/upload-resume.tsx
import React from 'react';
import { useRouter } from 'next/router';
import ResumeUploader from '../components/ResumeUploader';

const UploadResumePage = () => {
  const router = useRouter();

  const handleUploadComplete = () => {
    // Navigate back to the profile page after a successful upload
    router.push('/profile');
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Upload Your Resume</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <ResumeUploader onUploadComplete={handleUploadComplete} />
      </div>
    </div>
  );
};

export default UploadResumePage;