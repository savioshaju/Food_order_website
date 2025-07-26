import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from './slice/restaurantSlice';
import menuReducer from './slice/menuSlice';
import allMenuReducer from './slice/allMenuSlice';
import cartReducer from './slice/cartSlice';

const store = configureStore({
    reducer: {
        restaurant: restaurantReducer,
        menu : menuReducer,
        allMenu : allMenuReducer,
        cart : cartReducer
    }
})

export default store;