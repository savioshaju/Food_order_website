import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const fetchRestaurant = async () => {
  const response = await api.get('/api/Restaurant');
  return response.data;
};

export const fetchRestaurantMenu = async (restaurantId) => {
  const response = await api.get(`/api/Restaurant/${restaurantId}/menu`);
  return response.data;
};

export const fetchallItems = async () => {
  const response = await api.get(`/api/Restaurant/items`);
  return response.data;
};
