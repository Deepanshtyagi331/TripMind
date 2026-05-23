import React from 'react';
import { format } from 'date-fns';
import { Calendar, Award } from 'lucide-react';

export const WelcomeHeader = ({ name = 'Traveler', totalItineraries = 0 }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text">
          {getGreeting()}, <span className="text-teal-400">{name}</span>
        </h1>
        <p className="text-white/50 text-sm mt-1 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-teal-500/80" />
          <span>{format(new Date(), 'EEEE, MMMM d, yyyy')}</span>
        </p>
      </div>

      <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 w-fit">
        <div className="w-10 h-10 bg-teal-500/10 border border-teal-500/30 rounded-xl flex items-center justify-center text-teal-400">
          <Award className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-white/50">Total Itineraries</p>
          <p className="text-xl font-bold">{totalItineraries}</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
