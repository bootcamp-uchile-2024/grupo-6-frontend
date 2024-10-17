import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice";
import productSlice from "./productSlice";

/* Configuración inicial de nuestro Store */
export const store = configureStore({
    reducer: {
        counter: counterReducer,

        productReducer: productSlice,

    }
});