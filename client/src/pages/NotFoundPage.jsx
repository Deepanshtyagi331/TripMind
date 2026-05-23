import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, AlertCircle } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-teal-400 mb-6 animate-pulse">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold mb-2">Page Not Found</h1>
      <p className="text-white/50 text-sm max-w-sm mb-8">
        The page you are looking for doesn't exist or has been relocated.
      </p>
      <Link to="/" className="btn-primary">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
