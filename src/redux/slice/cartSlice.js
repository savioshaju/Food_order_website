import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalPrice: 0
    },
    reducers: {
            
        addItem(state, action) {
            const item = action.payload;
            const existingItem = state.items.find(i => i.id === item.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...item, quantity: 1 });
            }

            state.totalPrice = parseFloat((state.totalPrice + item.price).toFixed(2));
        },

        incrementQuantity(state, action) {
            const id = action.payload;
            const item = state.items.find(i => i.id === id);
            if (!item) return;

            item.quantity += 1;
            state.totalPrice = parseFloat((state.totalPrice + item.price).toFixed(2));
        },

        decrementQuantity(state, action) {
            const id = action.payload;
            const item = state.items.find(i => i.id === id);
            if (!item) return;

            item.quantity -= 1;
            state.totalPrice = parseFloat((state.totalPrice - item.price).toFixed(2));

            if (item.quantity <= 0) {
                state.items = state.items.filter(i => i.id !== id);
            }
        },

        clearCart(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    }
});

export const { addItem,incrementQuantity,decrementQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
