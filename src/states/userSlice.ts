import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ICreateUser } from '../interfaces/ICreateUser';

// Definición del estado inicial
interface UserState {
    users: ICreateUser[];
    loading: boolean;
    error: string | null;
}

// Estado inicial
const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
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
    async (user: ICreateUser) => {
        const response = await fetch(`http://localhost:3000/users/${user.id}`, {
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
    async (id: string) => {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Error al eliminar el usuario');
        return id;
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<ICreateUser[]>) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error al cargar usuarios';
            })
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<ICreateUser>) => {
                const index = state.users.findIndex((user) => user.id.toString() === action.payload.id.toString());
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
                state.users = state.users.filter((user) => user.id.toString() !== action.payload);
            });
    },
});

export default userSlice.reducer;