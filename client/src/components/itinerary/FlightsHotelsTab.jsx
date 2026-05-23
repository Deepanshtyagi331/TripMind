import React from 'react';
import FlightCard from './FlightCard';
import HotelCard from './HotelCard';
import { Plane, Hotel, AlertCircle } from 'lucide-react';

export const FlightsHotelsTab = ({ flights = [], hotels = [] }) => {
  const hasFlights = flights && flights.length > 0;
  const hasHotels = hotels && hotels.length > 0;

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Flights Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold tracking-tight flex items-center gap-2.5 pb-3 border-b border-white/5 text-white/90">
          <Plane className="w-5 h-5 text-teal-400 rotate-45" />
          <span>Flight Bookings</span>
        </h3>

        {hasFlights ? (
          <div className="grid grid-cols-1 gap-4">
            {flights.map((flight, idx) => (
              <FlightCard key={`${flight.flightNo}-${idx}`} flight={flight} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-8 text-center border-white/5 flex flex-col items-center justify-center">
            <AlertCircle className="w-8 h-8 text-white/20 mb-2" />
            <p className="text-sm text-white/40 italic">No flight details extracted from documents.</p>
          </div>
        )}
      </div>

      {/* Hotels Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold tracking-tight flex items-center gap-2.5 pb-3 border-b border-white/5 text-white/90">
          <Hotel className="w-5 h-5 text-teal-400" />
          <span>Hotel Accommodations</span>
        </h3>

        {hasHotels ? (
          <div className="grid grid-cols-1 gap-4">
            {hotels.map((hotel, idx) => (
              <HotelCard key={`${hotel.name}-${idx}`} hotel={hotel} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-8 text-center border-white/5 flex flex-col items-center justify-center">
            <AlertCircle className="w-8 h-8 text-white/20 mb-2" />
            <p className="text-sm text-white/40 italic">No hotel details extracted from documents.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightsHotelsTab;
