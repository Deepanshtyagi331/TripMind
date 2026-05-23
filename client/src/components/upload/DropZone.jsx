import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Image, AlertCircle } from 'lucide-react';

export const DropZone = ({ onFilesAdded, fileCount = 0 }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        onFilesAdded(acceptedFiles);
      }
    },
    [onFilesAdded]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxFiles: 5 - fileCount,
    disabled: fileCount >= 5,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center min-h-[220px] ${
        isDragReject
          ? 'border-red-500/50 bg-red-500/5'
          : isDragActive
          ? 'border-teal-400 bg-teal-500/5 shadow-inner'
          : fileCount >= 5
          ? 'border-white/5 bg-white/1 cursor-not-allowed opacity-50'
          : 'border-white/10 hover:border-teal-500/50 hover:bg-white/1'
      }`}
    >
      <input {...getInputProps()} />

      <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-4 transition-colors duration-200">
        <Upload
          className={`w-6 h-6 transition-all duration-200 ${
            isDragActive ? 'text-teal-400 scale-110' : 'text-white/50'
          }`}
        />
      </div>

      {isDragReject ? (
        <>
          <p className="text-red-400 font-bold mb-1">Unsupported file selected</p>
          <p className="text-white/40 text-xs">Only PDF and JPG/PNG/WEBP images are allowed</p>
        </>
      ) : fileCount >= 5 ? (
        <>
          <p className="text-white/60 font-bold mb-1">Upload limit reached</p>
          <p className="text-white/40 text-xs">You have already selected 5 files</p>
        </>
      ) : (
        <>
          <p className="font-bold text-sm mb-1 text-white/90">
            {isDragActive ? 'Drop your documents here!' : 'Drag & drop booking documents'}
          </p>
          <p className="text-white/40 text-xs mb-3">PDF and images are supported (max 10MB each)</p>
          <button
            type="button"
            className="px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg text-xs font-semibold tracking-wide transition-all duration-150 cursor-pointer"
          >
            Browse Files
          </button>
        </>
      )}
    </div>
  );
};

export default DropZone;
