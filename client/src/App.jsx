import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ItineraryProvider } from './context/ItineraryContext';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/shared/ErrorBoundary';

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider>
          <ItineraryProvider>
            {/* Global toast notification system */}
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: '#1e293b',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  fontSize: '14px',
                  borderRadius: '12px',
                },
                success: {
                  iconTheme: {
                    primary: '#0d9488',
                    secondary: '#fff',
                  },
                },
              }}
            />

            {/* Layout structures */}
            <Navbar />
            
            <main className="flex-1 pt-16">
              <AppRoutes />
            </main>

            <Footer />
          </ItineraryProvider>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
