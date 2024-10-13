import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ShoppingCartEntrada } from "../interfaces/ShoppingCartEntrada";

const productsEmpty: ShoppingCartEntrada[] = (() => {
    return [];
})();

const initialState:  ShoppingCartEntrada[] = (() => {
    return [];
})();

export const productSlice = createSlice({

    name: "carro",
    initialState,
    reducers: {
        addProduct: (state: ShoppingCartEntrada, action: PayloadAction<ShoppingCartEntrada>) => {
            state.push(action.payload)
        },

        deleteProduct: (state, action: PayloadAction<any>) => {
            state.products.pop(action.payload)
        },

        deleteAllProduct: (state) => {
            state.products = productsEmpty
        },

        getAllProduct: (state) => {
            state.products
        },
    },
});

export const { addProduct, deleteProduct, getAllProduct } = productSlice.actions;

export default productSlice;