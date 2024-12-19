import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '../interfaces/IUser';

// Definición del estado inicial
interface UserState {
    users: IUser[];
    loading: boolean;
    error: string | null;
    role: string;
}

// Estado inicial
const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
    role: 'user',
};

// Para obtener los usuarios desde el backend
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {

    const response = await fetch('http://localhost:3000/users/');
    if (!response.ok) throw new Error('No se pudieron cargar los usuarios');
    return response.json();
});

// Para actualizar usuario
export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (user: IUser) => {
        const response = await fetch(`http://localhost:3000/users/${user.idUsuario}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
        if (!response.ok) throw new Error('Error al actualizar el usuario');
        return response.json();
    }
);

// Para eliminar usuario
export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (idUsuario: string) => {
        const response = await fetch(`http://localhost:3000/users/${idUsuario}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Error al eliminar el usuario');
        return idUsuario;
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState,

    reducers: {
        // Permite actualizar el rol del usuario
        setUserRole(state, action: PayloadAction<string>){
            state.role = action.payload; 
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error al cargar usuarios';
            })
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                const index = state.users.findIndex((user) => user.idUsuario.toString() === action.payload.idUsuario.toString());
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
                state.users = state.users.filter((user) => user.idUsuario.toString() !== action.payload);
            });
    },
});

export const { setUserRole } = userSlice.actions;

export const selectUserRole = (state: { users: UserState }) => state.users?.role || 'user';

export default userSlice.reducer;
