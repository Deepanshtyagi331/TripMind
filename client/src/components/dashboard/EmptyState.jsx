import React from 'react';
import { FileUp, Sparkles } from 'lucide-react';

export const EmptyState = ({ onUploadClick }) => {
  return (
    <div className="glass-card p-12 text-center border-dashed border-white/10 flex flex-col items-center justify-center max-w-xl mx-auto my-8">
      <div className="w-16 h-16 bg-teal-500/10 border border-teal-500/30 rounded-2xl flex items-center justify-center mb-6 relative">
        <FileUp className="w-8 h-8 text-teal-400" />
        <Sparkles className="w-4 h-4 text-teal-300 absolute -top-1 -right-1 animate-pulse" />
      </div>

      <h3 className="text-xl font-bold mb-2">No itineraries yet</h3>
      <p className="text-white/50 text-sm mb-8 max-w-sm">
        Upload your flight confirmations, hotel bookings, or tour tickets, and let our AI compile a detailed travel plan for you.
      </p>

      <button
        onClick={onUploadClick}
        className="btn-primary flex items-center gap-2 cursor-pointer"
      >
        <FileUp className="w-5 h-5" />
        <span>Upload Booking Documents</span>
      </button>
    </div>
  );
};

export default EmptyState;
