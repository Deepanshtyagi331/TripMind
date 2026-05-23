import axiosInstance from './axiosInstance';

export const generateItinerary = async (documentIds) => {
  const response = await axiosInstance.post('/itineraries/generate', { documentIds });
  return response.data;
};

export const getItineraries = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get(`/itineraries?page=${page}&limit=${limit}`);
  return response.data;
};

export const getItinerary = async (id) => {
  const response = await axiosInstance.get(`/itineraries/${id}`);
  return response.data;
};

export const deleteItinerary = async (id) => {
  const response = await axiosInstance.delete(`/itineraries/${id}`);
  return response.data;
};

export const shareItinerary = async (id) => {
  const response = await axiosInstance.post(`/itineraries/${id}/share`);
  return response.data;
};

export const getSharedItinerary = async (shareToken) => {
  const response = await axiosInstance.get(`/share/${shareToken}`);
  return response.data;
};
