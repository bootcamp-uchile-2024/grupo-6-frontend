import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICreateUser } from '../interfaces/ICreateUser';

interface UserState {
    users: ICreateUser[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

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

        addUser: (state, action: PayloadAction<ICreateUser>) => {
            state.users.push(action.payload);
        },

        updateUser: (state, action: PayloadAction<ICreateUser>) => {
            const index = state.users.findIndex(user => user.correoElectronico === action.payload.correoElectronico);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        }
    },
});

export const { setUsers, setLoading, setError, deleteUser, addUser, updateUser } = userSlice.actions;

// Función para obtener la lista de usuarios
/* export const fetchUsers= () => async (dispatch: any) => {
    dispatch(setLoading(true));

    try {
        const response = await fetch('/api/users') //Cambiar según swagger

        if (!response.ok) {
            throw new Error('Error al obtener los usuarios');
        }

        const data = await response.json();
        dispatch(setUsers(data));

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        dispatch(setError(errorMessage));
    } finally {
        dispatch(setLoading(false));
    }
};

export const deleteUserByCorreoElectronico = (correoElectronico : string) => async (dispatch : any) => {
    try {
        const response = await fetch(`/api/users/${correoElectronico}`, { method: 'DELETE' }); //Cambiar según swagger

        if (!response.ok){
            throw new Error('Error al eliminar el usuario');
        }

        dispatch(deleteUser(correoElectronico));
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        dispatch(setError(errorMessage));
    }
};

export default userSlice.reducer; */