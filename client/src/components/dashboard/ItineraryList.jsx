import React from 'react';
import ItineraryCard from './ItineraryCard';
import SkeletonCard from '../shared/SkeletonCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ItineraryList = ({
  itineraries = [],
  loading = false,
  pagination,
  onPageChange,
  onDelete,
  onShareToggle,
}) => {
  if (loading && itineraries.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {itineraries.map((itinerary) => (
          <ItineraryCard
            key={itinerary._id}
            itinerary={itinerary}
            onDelete={onDelete}
            onShareToggle={onShareToggle}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 transition-all duration-200 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-sm font-medium text-white/70">
            Page <span className="text-white font-bold">{pagination.page}</span> of{' '}
            <span className="text-white font-bold">{pagination.totalPages}</span>
          </span>

          <button
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 transition-all duration-200 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ItineraryList;
