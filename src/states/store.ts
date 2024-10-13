import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice";

/* Configuración inicial de nuestro Store */
export const store = configureStore({
    reducer: {
        counter: counterReducer,
    }
});