import React from 'react';
import { Hotel, Calendar, MapPin, ClipboardList } from 'lucide-react';

export const HotelCard = ({ hotel }) => {
  return (
    <div className="glass-card p-6 border-white/5 bg-gradient-to-br from-white/5 to-white/1 relative overflow-hidden group">
      {/* Decorative Glow */}
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-teal-500/5 rounded-full blur-xl group-hover:bg-teal-500/10 transition-all duration-300" />

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        {/* Branding & Info */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-teal-500/10 border border-teal-500/30 rounded-xl flex items-center justify-center text-teal-400 shrink-0">
            <Hotel className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-lg text-white/90 leading-tight">
              {hotel.name || 'Hotel Accommodation'}
            </h4>
            {hotel.address && (
              <div className="flex items-center gap-1.5 text-xs text-white/50">
                <MapPin className="w-3.5 h-3.5 text-teal-500/80 shrink-0" />
                <span className="line-clamp-1">{hotel.address}</span>
              </div>
            )}
            {hotel.confirmationNo && (
              <div className="flex items-center gap-1.5 text-xs text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-md w-fit font-semibold mt-2">
                <ClipboardList className="w-3.5 h-3.5" />
                <span>Conf: {hotel.confirmationNo}</span>
              </div>
            )}
          </div>
        </div>

        {/* Check in/out Dates */}
        <div className="grid grid-cols-2 gap-8 border-t border-white/5 md:border-none pt-4 md:pt-0">
          <div>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider flex items-center gap-1 mb-1">
              <Calendar className="w-3.5 h-3.5 text-teal-500/80" />
              <span>Check In</span>
            </p>
            <p className="text-sm font-bold text-white/90">{hotel.checkIn || 'TBA'}</p>
          </div>

          <div>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider flex items-center gap-1 mb-1">
              <Calendar className="w-3.5 h-3.5 text-teal-500/80" />
              <span>Check Out</span>
            </p>
            <p className="text-sm font-bold text-white/90">{hotel.checkOut || 'TBA'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
