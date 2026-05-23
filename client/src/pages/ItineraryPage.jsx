import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useItineraries } from '../hooks/useItineraries';
import {
  Compass,
  Calendar,
  Plane,
  Hotel,
  Lightbulb,
  ArrowLeft,
  Share2,
  Trash2,
  AlertTriangle,
  Globe,
  Lock,
} from 'lucide-react';
import ItineraryTabs from '../components/itinerary/ItineraryTabs';
import OverviewTab from '../components/itinerary/OverviewTab';
import DayByDayTab from '../components/itinerary/DayByDayTab';
import FlightsHotelsTab from '../components/itinerary/FlightsHotelsTab';
import TipsTab from '../components/itinerary/TipsTab';
import ShareButtons from '../components/shared/ShareButtons';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import toast from 'react-hot-toast';

export const ItineraryPage = () => {
  const { id } = useParams();
  const {
    currentItinerary,
    loading,
    fetchItinerary,
    removeItinerary,
    toggleShareItinerary,
  } = useItineraries();

  const [activeTab, setActiveTab] = useState('overview');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItinerary(id).catch((err) => {
      console.error(err);
      toast.error('Failed to load itinerary folder');
    });
  }, [id]);

  const handleShareToggle = async () => {
    try {
      const data = await toggleShareItinerary(currentItinerary._id);
      toast.success(data.isPublic ? 'Itinerary is now public!' : 'Itinerary is now private!');
    } catch {
      toast.error('Failed to toggle sharing');
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await removeItinerary(currentItinerary._id);
      toast.success('Itinerary successfully deleted');
      navigate('/dashboard');
    } catch {
      toast.error('Failed to delete itinerary');
      setIsDeleting(false);
    }
  };

  if (loading && !currentItinerary) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!currentItinerary) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Itinerary not found</h3>
        <p className="text-white/50 text-sm mb-6">
          This itinerary may have been deleted, or you might not have authorization to view it.
        </p>
        <Link to="/dashboard" className="btn-primary inline-flex">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Compass },
    { id: 'daybyday', label: 'Day-by-Day', icon: Calendar },
    { id: 'flightshotels', label: 'Flights & Hotels', icon: Plane },
    { id: 'tips', label: 'Tips & Budget', icon: Lightbulb },
  ];

  const shareUrl = `${window.location.origin}/share/${currentItinerary.shareToken}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Toolbar Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white/5 border border-white/5 p-4 rounded-2xl">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Share Toggle Option */}
          <button
            onClick={() => setShowShareModal(true)}
            className="btn-secondary py-2 px-4 text-xs font-semibold cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-teal-400" />
            <span>Share Plan</span>
          </button>

          {/* Delete Trigger */}
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="btn-secondary py-2 px-4 text-xs font-semibold hover:border-red-500/20 hover:bg-red-500/10 text-white/80 hover:text-red-400 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Structured Travel Tabs */}
      <ItineraryTabs activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />

      {/* Tab Panels Contents Router */}
      <div className="mt-6">
        {activeTab === 'overview' && <OverviewTab itinerary={currentItinerary} />}
        {activeTab === 'daybyday' && (
          <DayByDayTab dayWisePlan={currentItinerary.structured?.dayWisePlan || []} />
        )}
        {activeTab === 'flightshotels' && (
          <FlightsHotelsTab
            flights={currentItinerary.structured?.flights || []}
            hotels={currentItinerary.structured?.hotels || []}
          />
        )}
        {activeTab === 'tips' && (
          <TipsTab
            tips={currentItinerary.structured?.tips || []}
            budgetEstimate={currentItinerary.structured?.totalBudgetEstimate}
          />
        )}
      </div>

      {/* Confirmation Modal Overlays */}
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setShowShareModal(false)}
            className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-md glass-card p-6 border-white/5 bg-navy-900 z-10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Globe className="w-5 h-5 text-teal-400" />
                <span>Share Itinerary</span>
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl">
                <div>
                  <p className="text-sm font-bold">Public Sharing</p>
                  <p className="text-xs text-white/40 mt-0.5">
                    Allow anyone with the link to view.
                  </p>
                </div>
                <button
                  onClick={handleShareToggle}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    currentItinerary.isPublic ? 'bg-teal-500' : 'bg-white/10'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      currentItinerary.isPublic ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {currentItinerary.isPublic && currentItinerary.shareToken && (
                <div className="animate-fade-in space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={shareUrl}
                      className="input-field py-2 text-xs truncate"
                    />
                  </div>
                  <ShareButtons shareUrl={shareUrl} title={`Check out my trip to ${currentItinerary.destination}!`} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => !isDeleting && setShowDeleteConfirm(false)}
            className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-sm glass-card p-6 border-white/5 bg-navy-900 z-10 text-center">
            <Trash2 className="w-10 h-10 text-red-500 mx-auto mb-3 animate-bounce" />
            <h3 className="font-bold text-lg mb-1">Delete Itinerary?</h3>
            <p className="text-xs text-white/50 mb-6">
              This action cannot be undone. All extracted bookings will be detached.
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-xl text-xs font-semibold cursor-pointer flex items-center gap-1.5"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryPage;
