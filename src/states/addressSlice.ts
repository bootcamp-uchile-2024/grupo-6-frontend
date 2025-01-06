import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AddressState {
    idDireccionEntrega: number | null; // ID de la dirección de entrega
    direccionEntrega: string; // Dirección de entrega
}

// Función para obtener el estado inicial desde `localStorage`
const getInitialState = (): AddressState => {
    const savedAddress = localStorage.getItem('__redux__address__');
    if (savedAddress) {
        return JSON.parse(savedAddress);
    }
    return {
        idDireccionEntrega: null,
        direccionEntrega: "",
    };
};

const initialState: AddressState = getInitialState();

export const addressSlice = createSlice({
    name: 'addressSlice',
    initialState,
    reducers: {
        setDireccionEntrega: (state, action: PayloadAction<{ idDireccionEntrega: number; direccionEntrega: string }>) => {
            const { idDireccionEntrega, direccionEntrega } = action.payload;
            state.idDireccionEntrega = idDireccionEntrega;
            state.direccionEntrega = direccionEntrega;

            // Guardar en localStorage para persistencia
            localStorage.setItem('__redux__address__', JSON.stringify(state));
        },
        clearDireccionEntrega: (state) => {
            state.idDireccionEntrega = null;
            state.direccionEntrega = "";
            localStorage.removeItem('__redux__address__');
        },
    },
});

// Exportar las acciones
export const { setDireccionEntrega, clearDireccionEntrega } = addressSlice.actions;

// Exportar el reducer
export default addressSlice.reducer;
