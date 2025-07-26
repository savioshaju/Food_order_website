import axios from "axios";

export const fetchRestaurant = async () => {
  const response = await axios.get('/api/api/Restaurant');
  return response.data;
};

export const fetchRestaurantMenu = async (restaurantId) => {
  const response = await axios.get(`/api/api/Restaurant/${restaurantId}/menu`);
  return response.data;
};

export const fetchallItems = async () => {
  const response = await axios.get(`/api/api/Restaurant/items`);
  return response.data;
};