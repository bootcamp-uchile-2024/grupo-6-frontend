import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILibro } from '../interfaces/ILibro';

interface ProductModifyState {
    book: ILibro
}


const getInitialState = (): ProductModifyState => {
    const savedProductModify = localStorage.getItem('__redux__product_modify__');
    if (savedProductModify) {
        return JSON.parse(savedProductModify);
    }
    return {
        book: {
            isbn: '',
            nombre: '',
            autor: '',
            precio: 0,
            stockLibro: 0,
            genero: [],
            editorial: '',
            idioma: '',
            encuadernacion: '',
            agnoPublicacion: '',
            numeroPaginas: 0,
            descuento: 0,
            caratula: new File([""], "filename"),
            dimensiones: '',
            codigoBarra: '',
            resumen: '',
            calificacion: 0,
            destacado: false
        },
        }
};

const initialState: ProductModifyState = getInitialState();

export const productModifyReducer = createSlice({
    name: 'productModifyReducer',
    initialState,
    reducers: {
        addProductModify: (state: ProductModifyState, action: PayloadAction<ILibro>) => {
            const { payload } = action;
            console.log("payload addProductModify" + payload);
            state.book = { ...payload }; 
            return state
        },
        removeProducttModify: (state: ProductModifyState, action: PayloadAction<ILibro>) => {
            const { payload } = action;
            console.log("payload removeProducttModify" + payload);
            const emptyBook =  {
                isbn: '',
                nombre: '',
                autor: '',
                precio: 0,
                stockLibro: 0,
                genero: [],
                editorial: '',
                idioma: '',
                encuadernacion: '',
                agnoPublicacion: '',
                numeroPaginas: 0,
                descuento: 0,
                caratula: new File([""], "filename"),
                dimensiones: '',
                codigoBarra: '',
                resumen: '',
                calificacion: 0 ,
                destacado: false
            };
            state.book = emptyBook;
            return state
        },

    },
});


export const {
    addProductModify,
    removeProducttModify
} = productModifyReducer.actions;

export default productModifyReducer.reducer;
