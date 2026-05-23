import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import RegisterForm from '../components/auth/RegisterForm';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';

export const RegisterPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-[85vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sm:mx-auto sm:w-full sm:max-w-md px-4"
      >
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-teal-500/10 border border-teal-500/30 rounded-2xl flex items-center justify-center">
            <Compass className="w-6 h-6 text-teal-400 animate-spin-slow" />
          </div>
        </div>
        <h2 className="text-center text-3xl font-extrabold tracking-tight">
          Create an account
        </h2>
        <p className="mt-2 text-center text-sm text-white/50">
          Start generating beautiful itineraries from your booking documents
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4"
      >
        <div className="glass-card p-8 border-white/5">
          <RegisterForm />
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
