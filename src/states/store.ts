import { configureStore, Middleware } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import productModifySlice from "./productModify"
import authSlice from "./authSlice"
import { productCartReducer } from './cartSlice';

const persistedCartState: Middleware = store => next => action => {

    next(action);
    const estado = store.getState();

    // Guarda el estado del carrito en localStorage
    const estadoAsJson = JSON.stringify(estado.productCartReducer);
    localStorage.setItem('__redux__product__', estadoAsJson);

    //Guarda el esta de la modificación de productos
    const estadoAsJsonProductModify = JSON.stringify(estado.productModifyReducer);
    localStorage.setItem('__redux__product_modify__', estadoAsJsonProductModify);
}

// Middleware para persistir el estado de autenticación del usuario
const persistedLoggedInState: Middleware = store => next => action => {

    next(action);
    const estado = store.getState();

    // solo guardamos en localStorage si usuario está autenticado
    if (estado.authReducer.isAuthenticated) {
        const estadoAsJson = JSON.stringify(estado.authReducer);
        localStorage.setItem('__redux__user__', estadoAsJson);
    } else {
        localStorage.removeItem('__redux__user__');
    }    
}

/* Configuración inicial de nuestro Store */
export const store = configureStore({
    reducer: {
        productCartReducer: productCartReducer,
        productReducer: productSlice,
        productModifyReducer: productModifySlice,
        authReducer: authSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistedCartState, persistedLoggedInState),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootType = ReturnType<typeof store.getState>;