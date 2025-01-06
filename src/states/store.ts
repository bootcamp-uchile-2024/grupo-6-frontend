import { configureStore, Middleware } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import productModifySlice from "./productModify"
import authSlice from "./authSlice"
import { productCartReducer } from './cartSlice';
import addressSlice from "./addressSlice";

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

const persistedLoggedInState: Middleware = store => next => action => {
    next(action);
    const estado = store.getState();

    if (estado.authReducer.isAuthenticated && estado.authReducer.user) {
        const { idUsuario, rol, token } = estado.authReducer.user;
        console.log('Guardando datos en localStorage:', { idUsuario, rol, token });
        localStorage.setItem('__redux__user__', JSON.stringify({ idUsuario, rol, token }));
    } else {
        console.log('Eliminando datos de localStorage');
        localStorage.removeItem('__redux__user__');
    }
};


const persistedAddressState: Middleware = store => next => action => {

    next(action);
    const estado = store.getState();

    // Guarda el estado de la direccion en localStorage
    const estadoAsJson = JSON.stringify(estado.addressReducer);
    localStorage.setItem('__redux__address__', estadoAsJson);
}

/* Configuración inicial de nuestro Store */
export const store = configureStore({
    reducer: {
        productCartReducer: productCartReducer,
        productReducer: productSlice,
        productModifyReducer: productModifySlice,
        authReducer: authSlice,
        addressReducer: addressSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistedCartState, persistedLoggedInState,persistedAddressState),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootType = ReturnType<typeof store.getState>;