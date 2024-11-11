import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    user: { correoElectronico: string; rol?: string } | null;  // Puede ser null si no está logueado
}

// false porque al inicio nadie está autenticado y null porque no hay datos de usuario
const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};

// slice para manejar la autenticación
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginAction: (state, action: PayloadAction<{ correoElectronico: string; rol: string }>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logoutAction: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const { loginAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;