import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

interface AuthState {
    isAuthenticated: boolean;
    user: { idUsuario: number; rol?: string, token?: string } | null;  // Puede ser null si no está logueado
}

const getInitialState = (): AuthState => {
    const savedData = localStorage.getItem('__redux__user__');
    if (savedData) {
        const parsed = JSON.parse(savedData);

        // Verifica si el token está presente y es válido
        if (parsed.token) {
            try {
                // Decodificar el token para verificar su validez
                const decodedToken = jwtDecode<{ rol: string }>(parsed.token);
                return {
                    isAuthenticated: true, // Estado autenticado
                    user: {
                        idUsuario: parsed.idUsuario,
                        rol: decodedToken.rol,
                        token: parsed.token,
                    },
                };
            } catch (error) {
                console.error("Error al decodificar el token:", error);
            }
        }
    }
    return {
        isAuthenticated: false,
        user: null,
    };
};

const initialState: AuthState = getInitialState();

// slice para manejar la autenticación
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginAction: (state, action: PayloadAction<{ idUsuario: number; rol: string, token: string }>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logoutAction: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('__redux__user__');
        },
    },
});

export const { loginAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;