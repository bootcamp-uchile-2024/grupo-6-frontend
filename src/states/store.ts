import { configureStore, Middleware } from "@reduxjs/toolkit";
import counterReducer from "./slice";
import productSlice from "./productSlice";
import productModifySlice from "./productModify"

const persistedState: Middleware = store => next => action => {

    //en refencia al estado pre cambio


    next(action);

    console.log(action)
    //en referencia al estado post cambio
    const estado = store.getState()

    const estadoAsJson = JSON.stringify(estado.productReducer)
    localStorage.setItem('__redux__product__', estadoAsJson)

    const estadoAsJsonProductModify = JSON.stringify(estado.productModifyReducer)
    localStorage.setItem('__redux__product_modify__', estadoAsJsonProductModify)


}

/* Configuración inicial de nuestro Store */
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        productReducer: productSlice,
        productModifyReducer: productModifySlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistedState),
});

export type RootType = ReturnType<typeof store.getState>