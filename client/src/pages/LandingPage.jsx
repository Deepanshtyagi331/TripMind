import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { Compass, Sparkles, FileText, Share2, Shield, CalendarDays, ArrowRight } from 'lucide-react';

export const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      icon: FileText,
      title: 'Doc Upload & Extract',
      desc: 'Simply drag and drop hotel vouchers, boarding passes, or tickets. We support PDF and images.',
    },
    {
      icon: Sparkles,
      title: 'AI Smart Orchestration',
      desc: 'Our neural models parser extracts all booking slots to design a unified day-wise timeline.',
    },
    {
      icon: Share2,
      title: 'Collaborative Sharing',
      desc: 'Generate gorgeous public travel pages to share with friends and travel companions with one click.',
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Decorative Blur BG Nodes */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl -z-10" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-4xl mx-auto"
        >
          {/* Badge indicator */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-teal-500/10 border border-teal-500/20 rounded-full text-xs font-bold text-teal-400 tracking-wider uppercase mb-2 animate-pulse">
            <Sparkles className="w-3.5 h-3.5 fill-teal-500/10" />
            <span>AI-Powered Travel Planning</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Turn booking receipts into <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              unified smart itineraries
            </span>
          </h1>

          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Upload your booking confirmations, tickets, and reservations. Our AI automatically parses all booking slots to output beautiful day-by-day travel schedules.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/register" className="btn-primary py-3 px-8 text-base font-bold shadow-teal-500/25">
              <span>Start Planning Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/login" className="btn-secondary py-3 px-8 text-base font-bold">
              Sign In
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5 bg-navy-900/20">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight">Streamlined travel organization</h2>
          <p className="text-white/50 text-sm max-w-md mx-auto leading-relaxed">
            Forget scanning multiple reservation emails. TripMind unifies everything in one beautiful page.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-card p-6 border-white/5 flex flex-col items-start hover:border-teal-500/20 transition-colors duration-200"
            >
              <div className="w-12 h-12 bg-teal-500/10 border border-teal-500/30 rounded-xl flex items-center justify-center text-teal-400 mb-6 shrink-0">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white/90">{feature.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Security Info Grid */}
      <section className="max-w-5xl mx-auto px-4 py-16 text-center">
        <div className="glass-card p-8 border-white/5 bg-gradient-to-br from-white/5 to-white/1 flex flex-col md:flex-row items-center gap-6 text-left">
          <div className="w-14 h-14 bg-teal-500/10 border border-teal-500/30 rounded-2xl flex items-center justify-center text-teal-400 shrink-0">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <h4 className="font-bold text-lg mb-1">Your travel data is secure</h4>
            <p className="text-xs text-white/50 leading-relaxed max-w-xl">
              All documents are processed in memory and encrypted during transfers. Hashed tokens keep your private folders restricted, and you control whether itineraries are publicly accessible.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
