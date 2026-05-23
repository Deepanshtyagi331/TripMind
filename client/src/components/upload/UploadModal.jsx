import React, { useState } from 'react';
import { X, Sparkles, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DropZone from './DropZone';
import FilePreview from './FilePreview';
import UploadProgress from './UploadProgress';
import * as documentApi from '../../api/documentApi';
import { useItineraries } from '../../hooks/useItineraries';
import toast from 'react-hot-toast';

export const UploadModal = ({ isOpen, onClose }) => {
  const { generateNewItinerary } = useItineraries();
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(1);

  const handleFilesAdded = (newFiles) => {
    const totalFiles = [...files, ...newFiles];
    if (totalFiles.length > 5) {
      toast.error('You can upload a maximum of 5 files.');
      return;
    }
    setFiles(totalFiles);
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, idx) => idx !== index));
  };

  const handleUploadAndGenerate = async () => {
    if (files.length === 0) {
      toast.error('Please select at least one document');
      return;
    }

    setIsProcessing(true);
    setProcessingStep(1);

    try {
      // Step 1 & 2: Upload documents and run OCR/extraction
      // Let's increment steps to show processing animations
      setTimeout(() => setProcessingStep(2), 2000);

      const uploadResult = await documentApi.uploadDocuments(files);

      if (uploadResult.success && uploadResult.documentIds.length > 0) {
        // Step 3: Call AI service to orchestrate structure plans
        setProcessingStep(3);
        const itinerary = await generateNewItinerary(uploadResult.documentIds);
        
        toast.success('Itinerary generated successfully!');
        setFiles([]);
        onClose(itinerary._id); // Send ID back to redirect
      } else {
        throw new Error('Upload succeeded but no document IDs returned.');
      }
    } catch (err) {
      console.error('File generation error:', err);
      toast.error(err.response?.data?.message || err.message || 'Generation failed. Please check files.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop Glass Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !isProcessing && onClose()}
          className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
        />

        {/* Modal Window Wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, type: 'spring' }}
          className="relative w-full max-w-xl glass-card border-white/5 overflow-hidden z-10 shadow-2xl bg-navy-900/90"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-white/5">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-400" />
              <span>Create Travel Itinerary</span>
            </h2>
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white rounded-lg hover:bg-white/5 disabled:opacity-30 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6">
            {isProcessing ? (
              <UploadProgress step={processingStep} />
            ) : (
              <div className="space-y-6">
                {/* Selection Drop Zone */}
                {files.length < 5 && (
                  <DropZone onFilesAdded={handleFilesAdded} fileCount={files.length} />
                )}

                {/* Previews */}
                {files.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                      Selected Documents ({files.length}/5)
                    </p>
                    <FilePreview files={files} onRemove={handleRemoveFile} />
                  </div>
                )}

                {/* Confirm Action Button */}
                {files.length > 0 && (
                  <button
                    onClick={handleUploadAndGenerate}
                    className="btn-primary w-full mt-4 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-5 h-5 fill-white/10" />
                    <span>Generate AI Itinerary</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UploadModal;
