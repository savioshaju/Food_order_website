import { createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
    name: "restaurant",
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        setLoading: state => {
            state.loading = true;
            state.error = null;
        },
        setRestaurant: (state, action) => {
            state.data = action.payload;
            state.loading = false;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
})

export const {setLoading,setRestaurant,setError} = restaurantSlice.actions;
export default restaurantSlice.reducer