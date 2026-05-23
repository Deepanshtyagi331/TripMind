import React from 'react';
import { Plane, ArrowRight, Clock } from 'lucide-react';

export const FlightCard = ({ flight }) => {
  return (
    <div className="glass-card p-6 border-white/5 bg-gradient-to-br from-white/5 to-white/1 relative overflow-hidden group">
      {/* Decorative Glow */}
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-teal-500/5 rounded-full blur-xl group-hover:bg-teal-500/10 transition-all duration-300" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: Airline Branding */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 bg-teal-500/10 border border-teal-500/30 rounded-xl flex items-center justify-center text-teal-400">
            <Plane className="w-6 h-6 rotate-45" />
          </div>
          <div>
            <p className="font-bold text-lg text-white/90">{flight.airline || 'Unknown Airline'}</p>
            <p className="text-xs text-white/40 font-semibold tracking-wide">
              FLIGHT {flight.flightNo || 'TBA'}
            </p>
          </div>
        </div>

        {/* Center: Route Connection */}
        <div className="flex flex-1 items-center justify-center md:px-12">
          <div className="flex items-center gap-4 w-full justify-between max-w-[280px]">
            <div className="text-center">
              <p className="text-xl font-bold tracking-wider text-white/90">{flight.from || 'DEP'}</p>
              <p className="text-[10px] text-white/35 font-bold uppercase tracking-wider mt-0.5">Origin</p>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center relative px-2">
              <div className="w-full h-px bg-white/15 relative">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500 absolute -top-0.5 left-0" />
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500 absolute -top-0.5 right-0" />
              </div>
              <ArrowRight className="w-4 h-4 text-teal-400/70 absolute bg-navy-950 px-0.5 py-px -top-2" />
            </div>

            <div className="text-center">
              <p className="text-xl font-bold tracking-wider text-white/90">{flight.to || 'ARR'}</p>
              <p className="text-[10px] text-white/35 font-bold uppercase tracking-wider mt-0.5">Dest</p>
            </div>
          </div>
        </div>

        {/* Right: Coordinates */}
        <div className="flex gap-8 border-t border-white/5 md:border-none pt-4 md:pt-0">
          <div>
            <p className="text-xs text-white/40 font-bold uppercase tracking-wider flex items-center gap-1 mb-1">
              <Clock className="w-3.5 h-3.5 text-teal-500/80" />
              <span>Departure</span>
            </p>
            <p className="text-sm font-bold text-white/90">{flight.departure || 'TBA'}</p>
          </div>

          <div>
            <p className="text-xs text-white/40 font-bold uppercase tracking-wider flex items-center gap-1 mb-1">
              <Clock className="w-3.5 h-3.5 text-teal-500/80" />
              <span>Arrival</span>
            </p>
            <p className="text-sm font-bold text-white/90">{flight.arrival || 'TBA'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
