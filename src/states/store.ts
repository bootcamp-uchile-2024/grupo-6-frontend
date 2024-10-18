import { configureStore, Middleware } from "@reduxjs/toolkit";
import counterReducer from "./slice";
import productSlice from "./productSlice";

const persistedState: Middleware = store => next => action => {

    //en refencia al estado pre cambio


    next(action);

    console.log(action)
    //en referencia al estado post cambio
    const estado = store.getState()

    const estadoAsJson = JSON.stringify(estado.productReducer)
    localStorage.setItem('__redux__product__', estadoAsJson)

}


/* Configuración inicial de nuestro Store */
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        productReducer: productSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistedState),

});

export type RootType = ReturnType<typeof store.getState>