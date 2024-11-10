import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    user: { correoElectronico: string; rol?: string } | null;  // Puede ser null si no está logueado
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};

// slice para manejar la autenticación
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ correoElectronico: string; rol: string }>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
