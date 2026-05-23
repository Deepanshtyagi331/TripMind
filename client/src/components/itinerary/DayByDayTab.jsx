import React, { useState } from 'react';
import ActivityTimeline from './ActivityTimeline';
import { CalendarDays, AlertTriangle } from 'lucide-react';

export const DayByDayTab = ({ dayWisePlan = [] }) => {
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);

  if (dayWisePlan.length === 0) {
    return (
      <div className="glass-card p-12 text-center border-white/5 flex flex-col items-center justify-center">
        <AlertTriangle className="w-12 h-12 text-white/30 mb-4" />
        <h4 className="font-bold text-lg">No day-wise plans found</h4>
        <p className="text-sm text-white/50 max-w-sm mt-1">
          We couldn't extract any structured day-wise plans from the uploaded documents.
        </p>
      </div>
    );
  }

  const currentDay = dayWisePlan[selectedDayIdx];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Day Selector Pills Bar */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {dayWisePlan.map((plan, idx) => {
          const isActive = selectedDayIdx === idx;
          return (
            <button
              key={plan.day || idx}
              onClick={() => setSelectedDayIdx(idx)}
              className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-500/25'
                  : 'bg-white/5 text-white/60 border-white/5 hover:text-white hover:bg-white/10'
              }`}
            >
              Day {plan.day || idx + 1}
            </button>
          );
        })}
      </div>

      {/* Date Header for Selected Day */}
      <div className="flex items-center gap-2.5 text-white/80 pb-4 border-b border-white/5">
        <CalendarDays className="w-5 h-5 text-teal-400" />
        <span className="font-bold text-lg">
          {currentDay.date ? `Schedule for ${currentDay.date}` : `Plan for Day ${currentDay.day}`}
        </span>
      </div>

      {/* Vertical Activities Timeline */}
      <div className="relative pl-1 max-w-2xl">
        {currentDay.activities && currentDay.activities.length > 0 ? (
          currentDay.activities.map((activity, idx) => (
            <ActivityTimeline
              key={`${activity.activity}-${idx}`}
              activity={activity}
              isLast={idx === currentDay.activities.length - 1}
            />
          ))
        ) : (
          <p className="text-white/40 text-sm italic py-4">No activities scheduled for this day.</p>
        )}
      </div>
    </div>
  );
};

export default DayByDayTab;
