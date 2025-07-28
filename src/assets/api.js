
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://res-34wr.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});


export const fetchRestaurant = async () => {
  const response = await api.get('/restaurants');
  console.log(response);
  return response.data;
};

export const fetchRestaurantMenu = async (restaurantId) => {
  const response = await api.get(`/items/${restaurantId}/menu`);
  return response.data;
};

export const fetchallItems = async () => {
  const response = await api.get('/items');
  console.log(response);
  return response.data;
};
