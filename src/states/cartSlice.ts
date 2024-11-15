import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShoppingCartEntrada } from '../interfaces/ShoppingCartEntrada';

// Estado inicial del carrito
interface CartState {
    cart: {
        items: ShoppingCartEntrada[];
    };
}

// Para obtener el estado inicial desde el localStorage
const getInitialState = (): CartState => {
    const savedCart = localStorage.getItem('__redux__product__');
    if (savedCart) {
        return JSON.parse(savedCart);
    }

    return {
        cart: {
            items: [],
        },
    };
};

//Estado inicial para el slice
const initialState: CartState = getInitialState();

const saveToLocalStorage = (state: CartState) => {
    localStorage.setItem('__redux__product__', JSON.stringify(state));
};

//Para crear el slice
const productCartSlice = createSlice({
    name: 'productCart',
    initialState,
    reducers: {

        addProductToCart: (state, action: PayloadAction<ShoppingCartEntrada>) => {
            const { payload } = action;
            if (state.cart.items.length === 0) {
                state.cart.items = [...state.cart.items, { ...payload }];
            } else {
                const indexItem = state.cart.items.findIndex(item => item.isbn === payload.isbn);
                if (indexItem >= 0) {
                    state.cart.items[indexItem].cantidad++;
                } else {
                    state.cart.items = [...state.cart.items, { ...payload }];
                }
                saveToLocalStorage(state);
            }
        },

        incrementProductQuantity: (state, action: PayloadAction<string>) => {
            const item = state.cart.items.find(item => item.isbn === action.payload);
            if (item) {
                item.cantidad++;
                saveToLocalStorage(state);
            }
        },

        setProductQuantity: (state, action: PayloadAction<{ isbn: string, cantidad: number }>) => {
            const { isbn, cantidad } = action.payload;
            const item = state.cart.items.find(item => item.isbn === isbn);
            if (item) {
                item.cantidad = cantidad;
                saveToLocalStorage(state);
            }
        },

        decrementProductQuantity: (state, action: PayloadAction<string>) => {
            const item = state.cart.items.find(item => item.isbn === action.payload);
            if (item && item.cantidad > 1) {
                item.cantidad--;
                saveToLocalStorage(state);
            }
        },

        removeProduct: (state, action: PayloadAction<string>) => {
            state.cart.items = state.cart.items.filter(item => item.isbn !== action.payload);
            saveToLocalStorage(state);
        },

        clearCart: (state) => {
            state.cart.items = [];
            saveToLocalStorage(state);
        },
    },
});

export const { 
    addProductToCart, 
    setProductQuantity, 
    incrementProductQuantity, 
    decrementProductQuantity, 
    removeProduct, 
    clearCart 
} = productCartSlice.actions;

export const productCartReducer = productCartSlice.reducer;

export const selectCartItemCount = (state: { productReducer: CartState }) =>
    state.productReducer.cart.items.reduce((total, item) => total + item.cantidad, 0);

export default productCartSlice.reducer;