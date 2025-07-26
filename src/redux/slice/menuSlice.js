import { createSlice } from "@reduxjs/toolkit";


const menuSlice = createSlice({
    name: "menu",
    initialState: {
        data: {},
        loading: false,
        error: null,
    },
    reducers: {
        setMenuLoading: state => {
            state.loading = true;
            state.error = null;
        },
        setMenu: (state, action) => {
            const { restaurantId, menuItems } = action.payload;
            state.data[restaurantId] = menuItems;
            state.loading = false;
        },
        setMenuError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
})

export const { setMenuLoading, setMenu, setMenuError } = menuSlice.actions
export default menuSlice.reducer