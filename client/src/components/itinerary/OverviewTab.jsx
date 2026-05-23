import React from 'react';
import { format } from 'date-fns';
import { Plane, Hotel, Calendar, Compass, Award } from 'lucide-react';

export const OverviewTab = ({ itinerary }) => {
  const { destination, travelDates, structured } = itinerary;

  const formattedDate = (dateString) => {
    if (!dateString) return 'TBA';
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch {
      return dateString;
    }
  };

  const flightsCount = structured?.flights?.length || 0;
  const hotelsCount = structured?.hotels?.length || 0;
  const planDaysCount = structured?.dayWisePlan?.length || 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Banner Area */}
      <div className="glass-card p-8 border-white/5 bg-gradient-to-br from-teal-500/10 via-white/5 to-white/1 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl" />
        
        <div className="max-w-xl">
          <span className="text-xs font-bold tracking-widest text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full uppercase">
            Travel Summary
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white mt-4">
            {itinerary.title || `Trip to ${destination}`}
          </h2>
          <p className="text-white/50 text-sm mt-2 flex items-center gap-2">
            <Compass className="w-4 h-4 text-teal-500" />
            <span>Destination: {destination}</span>
          </p>

          {(travelDates?.from || travelDates?.to) && (
            <p className="text-white/40 text-xs mt-1 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-500/80" />
              <span>
                {formattedDate(travelDates.from)} &mdash; {formattedDate(travelDates.to)}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Analytics Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Days */}
        <div className="glass-card p-5 border-white/5 flex items-center gap-4">
          <div className="w-10 h-10 bg-teal-500/10 border border-teal-500/30 rounded-xl flex items-center justify-center text-teal-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-white/40 font-bold uppercase tracking-wider">Duration</p>
            <p className="text-lg font-extrabold">{planDaysCount} Days</p>
          </div>
        </div>

        {/* Total Flights */}
        <div className="glass-card p-5 border-white/5 flex items-center gap-4">
          <div className="w-10 h-10 bg-teal-500/10 border border-teal-500/30 rounded-xl flex items-center justify-center text-teal-400">
            <Plane className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-white/40 font-bold uppercase tracking-wider">Flights Booked</p>
            <p className="text-lg font-extrabold">{flightsCount} Flights</p>
          </div>
        </div>

        {/* Total Hotels */}
        <div className="glass-card p-5 border-white/5 flex items-center gap-4">
          <div className="w-10 h-10 bg-teal-500/10 border border-teal-500/30 rounded-xl flex items-center justify-center text-teal-400">
            <Hotel className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-white/40 font-bold uppercase tracking-wider">Hotels Booked</p>
            <p className="text-lg font-extrabold">{hotelsCount} Hotels</p>
          </div>
        </div>
      </div>

      {/* Budget & Extras Summary */}
      {structured?.totalBudgetEstimate && (
        <div className="glass-card p-6 border-white/5">
          <h3 className="font-bold text-lg mb-2">Estimated Budget</h3>
          <p className="text-2xl font-extrabold text-teal-400">{structured.totalBudgetEstimate}</p>
          <p className="text-xs text-white/40 mt-1">
            Approximated total parsed from uploaded documents.
          </p>
        </div>
      )}
    </div>
  );
};

export default OverviewTab;
