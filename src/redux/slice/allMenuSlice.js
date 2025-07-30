import { createSlice } from "@reduxjs/toolkit";

const allMenuSlice = createSlice({
    name: "allMenu",
    initialState: {
        data: null,
        loading: false,
        error: null,
        search: false,
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
        setSearch: (state, action) => {
            state.search = action.payload;
        },
    },
});

export const { setAllMenuError, setAllMenu, setAllMenuLoading, setSearch } = allMenuSlice.actions;
export default allMenuSlice.reducer;
