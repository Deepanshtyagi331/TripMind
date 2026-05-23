import React, { createContext, useState } from 'react';
import * as itineraryApi from '../api/itineraryApi';

export const ItineraryContext = createContext();

export const ItineraryProvider = ({ children }) => {
  const [itineraries, setItineraries] = useState([]);
  const [currentItinerary, setCurrentItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const fetchItineraries = async (page = 1) => {
    setLoading(true);
    try {
      const data = await itineraryApi.getItineraries(page);
      if (data.success) {
        setItineraries(data.itineraries);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching itineraries:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchItinerary = async (id) => {
    setLoading(true);
    try {
      const data = await itineraryApi.getItinerary(id);
      if (data.success) {
        setCurrentItinerary(data.itinerary);
        return data.itinerary;
      }
    } catch (error) {
      console.error('Error fetching itinerary:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const generateNewItinerary = async (documentIds) => {
    setLoading(true);
    try {
      const data = await itineraryApi.generateItinerary(documentIds);
      if (data.success) {
        setItineraries((prev) => [data.itinerary, ...prev]);
        setCurrentItinerary(data.itinerary);
        return data.itinerary;
      }
    } catch (error) {
      console.error('Error generating itinerary:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeItinerary = async (id) => {
    try {
      const data = await itineraryApi.deleteItinerary(id);
      if (data.success) {
        setItineraries((prev) => prev.filter((itinerary) => itinerary._id !== id));
        if (currentItinerary && currentItinerary._id === id) {
          setCurrentItinerary(null);
        }
        return true;
      }
    } catch (error) {
      console.error('Error deleting itinerary:', error);
      throw error;
    }
  };

  const toggleShareItinerary = async (id) => {
    try {
      const data = await itineraryApi.shareItinerary(id);
      if (data.success) {
        if (currentItinerary && currentItinerary._id === id) {
          setCurrentItinerary((prev) => ({
            ...prev,
            isPublic: data.isPublic,
            shareToken: data.shareToken,
          }));
        }
        // Update item in list too
        setItineraries((prev) =>
          prev.map((it) =>
            it._id === id
              ? { ...it, isPublic: data.isPublic, shareToken: data.shareToken }
              : it
          )
        );
        return data;
      }
    } catch (error) {
      console.error('Error sharing itinerary:', error);
      throw error;
    }
  };

  return (
    <ItineraryContext.Provider
      value={{
        itineraries,
        currentItinerary,
        loading,
        pagination,
        fetchItineraries,
        fetchItinerary,
        generateNewItinerary,
        removeItinerary,
        toggleShareItinerary,
        setCurrentItinerary,
      }}
    >
      {children}
    </ItineraryContext.Provider>
  );
};
