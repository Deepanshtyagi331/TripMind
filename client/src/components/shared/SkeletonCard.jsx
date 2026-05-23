import React from 'react';

export const SkeletonCard = () => {
  return (
    <div className="glass-card p-6 border-white/5 animate-pulse flex flex-col gap-4">
      {/* Title */}
      <div className="h-6 bg-white/10 rounded-md w-3/4" />
      {/* Destination & Icon */}
      <div className="flex gap-2">
        <div className="h-4 bg-white/10 rounded-md w-4" />
        <div className="h-4 bg-white/10 rounded-md w-1/2" />
      </div>
      {/* Date Range */}
      <div className="flex gap-2">
        <div className="h-4 bg-white/10 rounded-md w-4" />
        <div className="h-4 bg-white/10 rounded-md w-1/3" />
      </div>
      {/* Divider */}
      <div className="h-px bg-white/5 w-full my-2" />
      {/* Actions */}
      <div className="flex justify-between items-center mt-auto">
        <div className="h-4 bg-white/10 rounded-md w-1/4" />
        <div className="flex gap-2">
          <div className="h-8 bg-white/10 rounded-lg w-8" />
          <div className="h-8 bg-white/10 rounded-lg w-8" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
