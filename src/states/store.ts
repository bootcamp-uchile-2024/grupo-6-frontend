import { configureStore, Middleware } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import productModifySlice from "./productModify"
import authSlice from "./authSlice"

const persistedCartState: Middleware = store => next => action => {

    next(action);
    const estado = store.getState();
    const estadoAsJson = JSON.stringify(estado.productReducer);
    localStorage.setItem('__redux__product__', estadoAsJson);
    const estadoAsJsonProductModify = JSON.stringify(estado.productModifyReducer);
    localStorage.setItem('__redux__product_modify__', estadoAsJsonProductModify);
}

const persistedLoggedInState: Middleware = store => next => action => {

    next(action);
    const estado = store.getState();
    const estadoAsJson = JSON.stringify(estado.authReducer);
    localStorage.setItem('__redux__user__', estadoAsJson);
}

/* Configuración inicial de nuestro Store */
export const store = configureStore({
    reducer: {
        productReducer: productSlice,
        productModifyReducer: productModifySlice,
        authReducer: authSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistedCartState, persistedLoggedInState),
});

export type RootType = ReturnType<typeof store.getState>