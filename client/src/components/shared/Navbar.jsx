import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Compass, Menu, X, LogOut, LayoutDashboard, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  // Don't show regular Navbar on public share pages to keep it clean (unless wanted, but we can display branded logo on share pages)
  const isSharePage = location.pathname.startsWith('/share');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-950/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-teal-500/10 border border-teal-500/30 rounded-xl flex items-center justify-center group-hover:bg-teal-500/20 transition-all duration-200">
              <Compass className="w-5 h-5 text-teal-400 group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text">
              Trip<span className="text-teal-400">Mind</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          {!isSharePage && (
            <div className="hidden md:flex items-center gap-6">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                      isActive('/dashboard') ? 'text-teal-400' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>

                  <div className="h-4 w-px bg-white/10" />

                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <div className="w-7 h-7 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold text-white">{user?.name}</span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm font-medium text-white/75 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-sm font-semibold text-white/80 hover:text-white transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link to="/register" className="btn-primary py-2 px-4 text-sm font-bold">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          )}

          {/* Public Share Branded Header CTA */}
          {isSharePage && (
            <div className="hidden md:flex items-center gap-4">
              <span className="text-xs text-white/40">Powered by AI itinerary planning</span>
              <Link to="/register" className="btn-primary py-1.5 px-4 text-xs font-bold">
                Create Your Own Trip
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          {!isSharePage && (
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && !isSharePage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy-950/95 border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 py-2 border-b border-white/5">
                    <div className="w-8 h-8 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50">Logged in as</p>
                      <p className="font-semibold text-sm">{user?.name}</p>
                    </div>
                  </div>

                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 py-2 text-sm font-medium transition-colors ${
                      isActive('/dashboard') ? 'text-teal-400' : 'text-white/70'
                    }`}
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 py-2 text-sm font-medium text-red-400 transition-colors w-full text-left cursor-pointer"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 text-sm font-semibold text-white/80 hover:text-white transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-primary w-full text-center"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
