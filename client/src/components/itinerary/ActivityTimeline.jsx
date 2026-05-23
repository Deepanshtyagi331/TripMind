import React from 'react';
import { Clock, MapPin, AlignLeft, Info } from 'lucide-react';

export const ActivityTimeline = ({ activity, isLast = false }) => {
  return (
    <div className="flex gap-4 group">
      {/* Time & Vertical Dot Line */}
      <div className="flex flex-col items-center">
        {/* Timeline Dot Indicator */}
        <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 group-hover:border-teal-500/50 group-hover:bg-teal-500/5 flex items-center justify-center text-white/50 group-hover:text-teal-400 transition-all duration-300">
          <Clock className="w-4 h-4" />
        </div>
        {/* Vertical Connected Line */}
        {!isLast && (
          <div className="w-0.5 bg-gradient-to-b from-white/10 to-transparent flex-1 my-2" />
        )}
      </div>

      {/* Activity Details Card */}
      <div className="flex-1 pb-8">
        <div className="glass-card p-5 border-white/5 hover:border-white/10 transition-colors duration-200">
          <div className="flex items-center justify-between gap-4 mb-2">
            <h5 className="font-bold text-base text-white/90 group-hover:text-teal-400 transition-colors duration-200">
              {activity.activity || 'Scheduled Event'}
            </h5>
            {activity.time && (
              <span className="text-xs font-semibold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full shrink-0">
                {activity.time}
              </span>
            )}
          </div>

          <div className="space-y-2 mt-3 text-sm">
            {/* Location */}
            {activity.location && (
              <div className="flex items-center gap-2 text-white/50">
                <MapPin className="w-4 h-4 text-teal-500/80 shrink-0" />
                <span>{activity.location}</span>
              </div>
            )}

            {/* Notes */}
            {activity.notes && (
              <div className="flex items-start gap-2 text-white/40 bg-white/1 border border-white/5 rounded-lg p-3 mt-2 text-xs leading-relaxed">
                <Info className="w-4 h-4 text-teal-500/70 shrink-0 mt-0.5" />
                <span>{activity.notes}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityTimeline;
