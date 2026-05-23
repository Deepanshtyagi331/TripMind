import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useItineraries } from '../hooks/useItineraries';
import WelcomeHeader from '../components/dashboard/WelcomeHeader';
import ItineraryList from '../components/dashboard/ItineraryList';
import EmptyState from '../components/dashboard/EmptyState';
import UploadModal from '../components/upload/UploadModal';
import { motion, AnimatePresence } from 'framer-motion';
import { FileUp, Sparkles, X, Globe, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export const DashboardPage = () => {
  const { user } = useAuth();
  const {
    itineraries,
    loading,
    pagination,
    fetchItineraries,
    removeItinerary,
    toggleShareItinerary,
  } = useItineraries();

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [activeShareItinerary, setActiveShareItinerary] = useState(null);
  const [copiedShare, setCopiedShare] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItineraries(1);
  }, []);

  const handlePageChange = (newPage) => {
    fetchItineraries(newPage);
  };

  const handleShareClick = (itinerary) => {
    setActiveShareItinerary(itinerary);
  };

  const handleShareToggleConfirm = async () => {
    try {
      const data = await toggleShareItinerary(activeShareItinerary._id);
      setActiveShareItinerary((prev) => ({
        ...prev,
        isPublic: data.isPublic,
        shareToken: data.shareToken,
      }));
      toast.success(data.isPublic ? 'Itinerary is now public!' : 'Itinerary is now private!');
    } catch {
      toast.error('Failed to change sharing state');
    }
  };

  const handleCopyLink = async (token) => {
    const clientUrl = window.location.origin;
    const url = `${clientUrl}/share/${token}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedShare(true);
      toast.success('Share link copied!');
      setTimeout(() => setCopiedShare(false), 2000);
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const handleUploadModalClose = (newItineraryId) => {
    setUploadModalOpen(false);
    if (newItineraryId) {
      navigate(`/itinerary/${newItineraryId}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Personalized Greeting */}
      <WelcomeHeader name={user?.name} totalItineraries={pagination.total} />

      {/* Dashboard Toolbar / Actions */}
      {itineraries.length > 0 && (
        <div className="flex justify-between items-center mb-8 bg-white/5 border border-white/5 p-4 rounded-2xl">
          <p className="text-sm text-white/60 font-medium">My Generated Itineraries</p>
          <button
            onClick={() => setUploadModalOpen(true)}
            className="btn-primary py-2 px-5 text-sm flex items-center gap-2 cursor-pointer"
          >
            <FileUp className="w-4 h-4" />
            <span>Create New Plan</span>
          </button>
        </div>
      )}

      {/* Main Content Layout */}
      {loading && itineraries.length === 0 ? (
        <ItineraryList itineraries={[]} loading={true} />
      ) : itineraries.length > 0 ? (
        <ItineraryList
          itineraries={itineraries}
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange}
          onDelete={removeItinerary}
          onShareToggle={handleShareClick}
        />
      ) : (
        <EmptyState onUploadClick={() => setUploadModalOpen(true)} />
      )}

      {/* Document Upload Modal */}
      <UploadModal isOpen={uploadModalOpen} onClose={handleUploadModalClose} />

      {/* Sharing Overlay Modal */}
      <AnimatePresence>
        {activeShareItinerary && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveShareItinerary(null)}
              className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md glass-card p-6 border-white/5 bg-navy-900 z-10"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Globe className="w-5 h-5 text-teal-400" />
                  <span>Sharing Options</span>
                </h3>
                <button
                  onClick={() => setActiveShareItinerary(null)}
                  className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold mb-1 text-white/95">
                    {activeShareItinerary.title || 'Itinerary'}
                  </p>
                  <p className="text-xs text-white/40">
                    Control public availability of your generated itinerary folders.
                  </p>
                </div>

                {/* Toggle Controls */}
                <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl">
                  <div>
                    <p className="text-sm font-bold">Public Sharing</p>
                    <p className="text-xs text-white/40 mt-0.5">
                      Allow anyone with the link to view.
                    </p>
                  </div>
                  <button
                    onClick={handleShareToggleConfirm}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      activeShareItinerary.isPublic ? 'bg-teal-500' : 'bg-white/10'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        activeShareItinerary.isPublic ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Public Link Generator */}
                {activeShareItinerary.isPublic && activeShareItinerary.shareToken && (
                  <div className="space-y-2.5">
                    <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider">
                      Shareable URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={`${window.location.origin}/share/${activeShareItinerary.shareToken}`}
                        className="input-field py-2 text-xs truncate select-all"
                      />
                      <button
                        onClick={() => handleCopyLink(activeShareItinerary.shareToken)}
                        className="btn-secondary px-3 py-2 flex items-center justify-center cursor-pointer shrink-0"
                      >
                        {copiedShare ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPage;
