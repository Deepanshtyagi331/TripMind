import React from 'react';
import { motion } from 'framer-motion';

export const ItineraryTabs = ({ activeTab, onTabChange, tabs = [] }) => {
  return (
    <div className="border-b border-white/5 mb-8 overflow-x-auto">
      <div className="flex gap-8 min-w-max pb-px">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`pb-4 px-1 text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer relative flex items-center gap-2 ${
                isActive ? 'text-teal-400' : 'text-white/50 hover:text-white'
              }`}
            >
              {tab.icon && <tab.icon className="w-4 h-4" />}
              <span>{tab.label}</span>

              {/* Active Underline Transition */}
              {isActive && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ItineraryTabs;
