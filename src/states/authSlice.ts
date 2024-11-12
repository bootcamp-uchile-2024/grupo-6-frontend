import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    user: { correoElectronico: string; rol?: string } | null;  // Puede ser null si no está logueado
}

const getInitialState = (): AuthState => {
    const savedLoggedIn = localStorage.getItem('__redux__user__');
    if (savedLoggedIn) {
        return JSON.parse(savedLoggedIn) as AuthState;
    }
    return {
        isAuthenticated: false,
        user: null,
    }
}

const initialState: AuthState = getInitialState();

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