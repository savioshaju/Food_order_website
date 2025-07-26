import { createSlice } from "@reduxjs/toolkit";

const allMenuSlice = createSlice({
    name: "allMenu",
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        setAllMenuLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        setAllMenu: (state, action) => {
            state.data = action.payload;
            state.loading = false;
        },
        setAllMenuError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { setAllMenuError, setAllMenu, setAllMenuLoading } = allMenuSlice.actions;
export default allMenuSlice.reducer;
