import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as itineraryApi from '../api/itineraryApi';
import {
  Compass,
  Calendar,
  Plane,
  Hotel,
  Lightbulb,
  AlertTriangle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import ItineraryTabs from '../components/itinerary/ItineraryTabs';
import OverviewTab from '../components/itinerary/OverviewTab';
import DayByDayTab from '../components/itinerary/DayByDayTab';
import FlightsHotelsTab from '../components/itinerary/FlightsHotelsTab';
import TipsTab from '../components/itinerary/TipsTab';
import LoadingSpinner from '../components/shared/LoadingSpinner';

export const SharePage = () => {
  const { shareToken } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchSharedData = async () => {
      setLoading(true);
      try {
        const data = await itineraryApi.getSharedItinerary(shareToken);
        if (data.success) {
          setItinerary(data.itinerary);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching public shared itinerary:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSharedData();
  }, [shareToken]);

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !itinerary) {
    return (
      <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center p-6 text-center">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-6 animate-bounce" />
        <h1 className="text-2xl font-bold mb-2">Itinerary not found</h1>
        <p className="text-white/60 mb-8 max-w-sm">
          This itinerary might be private or doesn't exist. Please check the URL and try again.
        </p>
        <Link to="/" className="btn-primary">
          Go to Homepage
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

  return (
    <div className="min-h-screen bg-navy-950 text-white flex flex-col">
      {/* Top CTA Banner */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-500 py-3.5 px-4 text-center text-xs font-bold flex items-center justify-center gap-2 relative overflow-hidden">
        <Sparkles className="w-4 h-4 text-teal-100 shrink-0 fill-teal-100/10" />
        <span>Create your own AI-powered travel itinerary from receipts in seconds!</span>
        <Link
          to="/register"
          className="ml-2 inline-flex items-center gap-1 bg-white text-teal-600 px-3 py-1 rounded-full text-[11px] font-extrabold hover:bg-teal-50 hover:shadow-md transition-all duration-200"
        >
          <span>Get Started Free</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Simple Header */}
        <div className="flex items-center gap-2.5 mb-10 pb-4 border-b border-white/5">
          <div className="w-8 h-8 bg-teal-500/10 border border-teal-500/30 rounded-xl flex items-center justify-center text-teal-400">
            <Compass className="w-4.5 h-4.5 animate-spin-slow" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white/95">
            Trip<span className="text-teal-400">Mind</span> Shared Itinerary
          </span>
        </div>

        {/* Structured Tabs Bar */}
        <ItineraryTabs activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />

        {/* Content Tabs Switch */}
        <div className="mt-6">
          {activeTab === 'overview' && <OverviewTab itinerary={itinerary} />}
          {activeTab === 'daybyday' && (
            <DayByDayTab dayWisePlan={itinerary.structured?.dayWisePlan || []} />
          )}
          {activeTab === 'flightshotels' && (
            <FlightsHotelsTab
              flights={itinerary.structured?.flights || []}
              hotels={itinerary.structured?.hotels || []}
            />
          )}
          {activeTab === 'tips' && (
            <TipsTab
              tips={itinerary.structured?.tips || []}
              budgetEstimate={itinerary.structured?.totalBudgetEstimate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SharePage;
