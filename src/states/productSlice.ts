import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShoppingCartEntrada } from '../interfaces/ShoppingCartEntrada';

interface CartState {
    cart: {
        items: ShoppingCartEntrada[];  // Especificar que los items son de tipo ShoppingCartEntrada
    };
}

const initialState: CartState = {
    cart: {
        items: [],
    },
};

export const cartStore = createSlice({
    name: 'cartStore',
    initialState,
    reducers: {
        addProductToCart: (state, action: PayloadAction<ShoppingCartEntrada>) => {
            const { payload } = action;
            const itemInCart = state.cart.items.find((item) => item.isbn === payload.isbn); // Cambiar id por isbn

            if (itemInCart) {
                itemInCart.cantidad++; // Cambiar quantity por cantidad
            } else {
                state.cart.items = [...state.cart.items, { ...payload, cantidad: 1 }]; // Asignar cantidad inicial a 1
            }
        },
        incrementProductQuantity: (state, action: PayloadAction<string>) => {
            const item = state.cart.items.find((item) => item.isbn === action.payload); // Usar isbn en lugar de id
            if (item) {
                item.cantidad++; // Cambiar quantity por cantidad
            }
        },
        setProductQuantity: (state, action: PayloadAction<{ isbn: string, cantidad: number }>) => {
            const { isbn, cantidad } = action.payload;
            const item = state.cart.items.find((item) => item.isbn === isbn); // Usar isbn en lugar de id
            if (item) {
                item.cantidad = cantidad; // Cambiar quantity por cantidad
            }
        },
        decrementProductQuantity: (state, action: PayloadAction<string>) => {
            const item = state.cart.items.find((item) => item.isbn === action.payload); // Usar isbn en lugar de id
            if (item && item.cantidad > 1) { // Cambiar quantity por cantidad
                item.cantidad--;
            }
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            state.cart.items = state.cart.items.filter((item) => item.isbn !== action.payload); // Usar isbn en lugar de id
        },
    },
});

export const {
    addProductToCart,
    setProductQuantity,
    incrementProductQuantity,
    decrementProductQuantity,
    removeProduct,
} = cartStore.actions;

export default cartStore.reducer;