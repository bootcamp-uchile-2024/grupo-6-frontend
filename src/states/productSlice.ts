import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShoppingCartEntrada } from '../interfaces/ShoppingCartEntrada';

interface CartState {
    cart: {
        items: ShoppingCartEntrada[];  // Especificar que los items son de tipo ShoppingCartEntrada
    };
}

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

const initialState: CartState = getInitialState();

export const productCartReducer = createSlice({
    name: 'productCartReducer',
    initialState,
    reducers: {
        addProductToCart: (state: CartState, action: PayloadAction<ShoppingCartEntrada>) => {
            const { payload } = action;
            console.log("payload addProductToCart" + payload);

            if ( state.cart.items.length == 0) {
                console.log("nuevo item");
                state.cart.items = [...state.cart.items, { ...payload }]; // Asignar cantidad inicial a 1
            } else {
                const indexItem = state.cart.items.findIndex( item => item.isbn === payload.isbn); // Cambiar id por isbn
                if (indexItem >= 0) {
                    console.log("item existe" + indexItem);
                    state.cart.items[indexItem].cantidad += 1 ; // Cambiar quantity por cantidad
                } else {
                    console.log("nuevo item");
                    state.cart.items = [...state.cart.items, { ...payload }]; // Asignar cantidad inicial a 1
                }
            }
            return state
        },
        incrementProductQuantity: (state, action: PayloadAction<string>) => {
            const item = state.cart.items.find((item) => item.isbn === action.payload); // Usar isbn en lugar de id
            if (item) {
                item.cantidad++; // Cambiar quantity por cantidad
            }
        },
        setProductQuantity: (state, action: PayloadAction<{ isbn: string, cantidad: number }>) => {
            const { isbn, cantidad } = action.payload;
            const item = state.cart.items.find((item) => item.isbn === isbn); // Usar isbn en lugar de id
            if (item) {
                item.cantidad = cantidad; // Cambiar quantity por cantidad
            }
        },
        decrementProductQuantity: (state: CartState, action: PayloadAction<string>) => {
                const { payload } = action;
                console.log("payload decrementProductQuantity" + payload);


                    const item = state.cart.items.find( item => item.isbn === payload); // Cambiar id por isbn
                    if (item && item.cantidad > 1) {
                        console.log("item a borrar" + item);
                        item.cantidad -= 1 ; // Cambiar quantity por cantidad
                    } 
                
                return state
        },
        removeProduct: (state: CartState, action: PayloadAction<ShoppingCartEntrada>) => {
            const { payload } = action;
            state.cart.items = state.cart.items.filter((item) => item.isbn !== payload.isbn); // Usar isbn en lugar de id
            return state
        },

        //Para vaciar todos los productos del carrito
        clearCart: (state: CartState) => {
            state.cart.items = [];
            return state;
        },
    },
});

// Para obtener la cantidad total de productos en el carrito
export const selectCartItemCount = (state: { productReducer: CartState }): number => {
    return state.productReducer.cart.items.reduce((total, item) => total + item.cantidad, 0);
};

export const {
    addProductToCart,
    setProductQuantity,
    incrementProductQuantity,
    decrementProductQuantity,
    removeProduct,
    clearCart,
} = productCartReducer.actions;

export default productCartReducer.reducer;
