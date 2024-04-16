import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';
import axios from '../../axios';
import authService from '../../services/authService.http';
import { User } from '../../types';

interface UserState {
    user: object;
    loading: string;
    error: string | undefined;
}

const initialState: UserState = {
    user: {},
    loading: "idle",
    error: ""
}

interface LoginInfo {
    email: string;
    password: string;
}

export const login = createAsyncThunk(
    'user/login',
    async (payload: LoginInfo) => {
        const { email, password } = payload
        const response = await authService.login({email, password});
        return response;
    }
)

export const logout = createAsyncThunk(
    'user/logout',
    async () => {
        const response = await axios.post('/logout');
        return response;
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser(state) {
            state.user = {}
        },
        storeUser(state, action: PayloadAction<User>) {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = "loading"
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = "completed"
            state.user = action.payload
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = "completed"
            state.error = action.error.message
        })
    },
})

export const { logoutUser, storeUser } = userSlice.actions
export const userSelector = (state: RootState) => state.userReducer
export default userSlice.reducer