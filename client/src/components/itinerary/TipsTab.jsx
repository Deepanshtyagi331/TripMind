import React from 'react';
import { Lightbulb, Info, Sparkles } from 'lucide-react';

export const TipsTab = ({ tips = [], budgetEstimate = null }) => {
  const hasTips = tips && tips.length > 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Budget Summary Card if available */}
      {budgetEstimate && (
        <div className="glass-card p-6 border-white/5 bg-gradient-to-br from-teal-500/5 to-white/1 flex items-start gap-4">
          <div className="w-10 h-10 bg-teal-500/10 border border-teal-500/30 rounded-xl flex items-center justify-center text-teal-400 shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-base text-white/95">Total Budget Estimate</h4>
            <p className="text-2xl font-extrabold text-teal-400 mt-1">{budgetEstimate}</p>
            <p className="text-xs text-white/40 mt-1 leading-relaxed">
              We parsed and compiled these cost items directly from your provided ticket stubs or confirmations.
            </p>
          </div>
        </div>
      )}

      {/* Safety & Travel Tips */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold tracking-tight flex items-center gap-2.5 pb-3 border-b border-white/5 text-white/90">
          <Lightbulb className="w-5 h-5 text-teal-400" />
          <span>AI Travel Tips & Insights</span>
        </h3>

        {hasTips ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tips.map((tip, idx) => (
              <div
                key={`${tip}-${idx}`}
                className="glass-card p-5 border-white/5 flex gap-3.5 hover:border-white/10 transition-colors duration-150"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
                  <Info className="w-4 h-4" />
                </div>
                <p className="text-sm text-white/80 leading-relaxed font-medium">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-8 text-center border-white/5 flex flex-col items-center justify-center">
            <Lightbulb className="w-8 h-8 text-white/20 mb-2" />
            <p className="text-sm text-white/40 italic">
              AI didn't generate any travel tips for this plan. You are good to go!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TipsTab;
