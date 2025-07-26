import axios from 'axios';

const isDev = import.meta.env.DEV;

const api = axios.create({
  baseURL: isDev
    ? '/api' 
    : 'https://fakerestaurantapi.runasp.net',
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
  const response = await api.get('/api/Restaurant/items');
  return response.data;
};
