import React from 'react';
import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-white/5 bg-navy-950 py-8 text-center text-sm text-white/40">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>&copy; {new Date().getFullYear()} TripMind. All rights reserved.</p>
        <p className="flex items-center gap-1.5 justify-center">
          Built with <Heart className="w-4 h-4 text-teal-400 fill-teal-400 animate-pulse" /> using the MERN Stack & AI
        </p>
      </div>
    </footer>
  );
};

export default Footer;
