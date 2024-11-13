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
export const fetchUsers= createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await fetch('/create-user-back', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }); //URL de la api
        if (!response.ok) {
            throw new Error('No se pudieron cargar los usuarios');
        }

        // Devuelve los usuarios como un array
        return response.json();
    } catch (error: any) {
        throw new Error(error.message || 'Error al cargar usuarios');
    }
});

const userSlice = createSlice({
    name: 'users',
    initialState,

    reducers: {
        setUsers: (state, action: PayloadAction<ICreateUser[]>) => {
            state.users = action.payload;
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },

        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },

        deleteUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter(user => user.correoElectronico !== action.payload);
        },

        addUsers: (state, action: PayloadAction<ICreateUser>) => {
            state.users.push(action.payload);
        },
        
        updateUser: (state, action: PayloadAction<ICreateUser>) => {
            const index = state.users.findIndex(user => user.correoElectronico === action.payload.correoElectronico);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
    },

    extraReducers: (builder) =>{
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
            });
    }
});

export const { setUsers, addUsers, updateUser, deleteUser, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;