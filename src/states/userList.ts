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