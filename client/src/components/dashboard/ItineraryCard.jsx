import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, MapPin, Share2, Trash2, ArrowRight, Eye, Globe, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export const ItineraryCard = ({ itinerary, onDelete, onShareToggle }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const formattedDate = (dateString) => {
    if (!dateString) return 'TBA';
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch {
      return 'TBA';
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(itinerary._id);
      toast.success('Itinerary deleted');
    } catch {
      toast.error('Failed to delete itinerary');
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="glass-card p-6 border-white/5 hover:border-teal-500/30 flex flex-col justify-between h-full relative"
    >
      <div>
        {/* Title */}
        <h3 className="text-xl font-bold mb-3 line-clamp-1 group-hover:text-teal-400">
          {itinerary.title || `Trip to ${itinerary.destination}`}
        </h3>

        {/* Destination */}
        <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
          <MapPin className="w-4 h-4 text-teal-500" />
          <span className="line-clamp-1">{itinerary.destination}</span>
        </div>

        {/* Dates */}
        <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
          <Calendar className="w-4 h-4 text-teal-500/80" />
          <span>
            {itinerary.travelDates?.from || itinerary.travelDates?.to ? (
              <>
                {formattedDate(itinerary.travelDates.from)} - {formattedDate(itinerary.travelDates.to)}
              </>
            ) : (
              'Dates not specified'
            )}
          </span>
        </div>
      </div>

      <div className="h-px bg-white/5 w-full my-4" />

      {/* Footer / Actions */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2">
          {itinerary.isPublic ? (
            <div className="flex items-center gap-1 text-xs text-teal-400 font-semibold bg-teal-500/10 px-2.5 py-1 rounded-full">
              <Globe className="w-3.5 h-3.5" />
              <span>Public</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-xs text-white/40 font-semibold bg-white/5 px-2.5 py-1 rounded-full">
              <Lock className="w-3.5 h-3.5" />
              <span>Private</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          {/* Share */}
          <button
            onClick={() => onShareToggle(itinerary)}
            className="w-9 h-9 bg-white/5 hover:bg-teal-500/10 text-white/70 hover:text-teal-400 border border-white/5 hover:border-teal-500/20 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer"
            title="Share Itinerary"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Delete Trigger */}
          <button
            onClick={() => setShowConfirm(true)}
            className="w-9 h-9 bg-white/5 hover:bg-red-500/10 text-white/70 hover:text-red-400 border border-white/5 hover:border-red-500/20 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer"
            title="Delete Itinerary"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          {/* View Link */}
          <Link
            to={`/itinerary/${itinerary._id}`}
            className="w-9 h-9 bg-teal-500/10 hover:bg-teal-500 text-teal-400 hover:text-white border border-teal-500/20 rounded-lg flex items-center justify-center transition-all duration-200"
            title="View Itinerary"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Delete Confirmation Overlay */}
      {showConfirm && (
        <div className="absolute inset-0 bg-navy-950/95 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-center items-center text-center z-10 animate-fade-in">
          <Trash2 className="w-10 h-10 text-red-500 mb-3" />
          <h4 className="font-bold text-lg mb-1">Delete Itinerary?</h4>
          <p className="text-xs text-white/50 mb-4 max-w-[200px]">
            This will permanently delete this travel plan.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setShowConfirm(false)}
              className="px-3.5 py-1.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-3.5 py-1.5 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"
            >
              {isDeleting ? 'Deleting...' : 'Yes, Delete'}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ItineraryCard;
