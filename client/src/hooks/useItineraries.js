import { useContext } from 'react';
import { ItineraryContext } from '../context/ItineraryContext';

export const useItineraries = () => {
  const context = useContext(ItineraryContext);
  if (!context) {
    throw new Error('useItineraries must be used within an ItineraryProvider');
  }
  return context;
};
export default useItineraries;
