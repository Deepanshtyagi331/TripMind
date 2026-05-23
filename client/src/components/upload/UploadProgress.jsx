import React from 'react';
import { Loader2, CheckCircle2, CloudLightning } from 'lucide-react';

export const UploadProgress = ({ step = 1 }) => {
  const steps = [
    { id: 1, label: 'Uploading Documents', desc: 'Saving booking files to cloud storage...' },
    { id: 2, label: 'Extracting Text', desc: 'Running OCR and document text parsing...' },
    { id: 3, label: 'AI Generation', desc: 'AI is constructing your day-wise travel itinerary...' },
  ];

  return (
    <div className="py-6 px-4 text-center max-w-md mx-auto">
      {/* Dynamic Animated Status Icon */}
      <div className="w-16 h-16 bg-teal-500/10 border border-teal-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 relative">
        <Loader2 className="w-8 h-8 text-teal-400 animate-spin" />
      </div>

      <h3 className="text-xl font-bold mb-1">Processing booking documents...</h3>
      <p className="text-sm text-white/50 mb-8">This may take up to a minute for large files.</p>

      {/* Vertical Steps Timeline */}
      <div className="space-y-6 text-left">
        {steps.map((s) => {
          const isCompleted = step > s.id;
          const isActive = step === s.id;

          return (
            <div key={s.id} className="flex gap-4 items-start">
              {/* Checkbox Icon Indicator */}
              <div className="mt-0.5">
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-teal-400 fill-teal-400/10" />
                ) : isActive ? (
                  <div className="w-5 h-5 border-2 border-teal-500 rounded-full flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-teal-400 rounded-full animate-pulse" />
                  </div>
                ) : (
                  <div className="w-5 h-5 border-2 border-white/10 rounded-full" />
                )}
              </div>

              {/* Step Text Details */}
              <div>
                <p
                  className={`text-sm font-bold transition-colors duration-150 ${
                    isActive ? 'text-teal-400' : isCompleted ? 'text-white/80' : 'text-white/30'
                  }`}
                >
                  {s.label}
                </p>
                <p
                  className={`text-xs mt-0.5 transition-colors duration-150 ${
                    isActive ? 'text-white/55' : isCompleted ? 'text-white/40' : 'text-white/20'
                  }`}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/5 border border-white/5 h-2 rounded-full mt-10 overflow-hidden relative">
        <div
          className="bg-teal-500 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default UploadProgress;
