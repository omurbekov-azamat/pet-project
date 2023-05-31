import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {getDevelopers, login, logout, register} from './usersThunks';
import {GlobalError, User, ValidationError} from '../../types';


interface UsersState {
    user: User | null;
    registerLoading: boolean;
    registerError: ValidationError | null,
    loginLoading: boolean;
    loginError: GlobalError | null;
    logoutLoading: boolean;
    developers: User[];
}

const initialState: UsersState = {
    user: null,
    registerLoading: false,
    registerError: null,
    loginLoading: false,
    loginError: null,
    logoutLoading: false,
    developers: [],
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.registerError = null;
            state.registerLoading = true;
        });
        builder.addCase(register.fulfilled, (state, {payload: user}) => {
            state.registerLoading = false;
            state.user = user;
        });
        builder.addCase(register.rejected, (state, {payload: error}) => {
            state.registerLoading = false;
            state.registerError = error || null;
        });
        builder.addCase(login.pending, (state) => {
            state.loginError = null;
            state.loginLoading = true;
        });
        builder.addCase(login.fulfilled, (state, {payload: user}) => {
            state.loginLoading = false;
            state.user = user;
        });
        builder.addCase(login.rejected, (state, {payload: error}) => {
            state.loginLoading = false;
            state.loginError = error || null;
        });
        builder.addCase(logout.pending, (state) => {
            state.logoutLoading = true;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.logoutLoading = false;
            state.user = null;
        });
        builder.addCase(logout.rejected, (state) => {
            state.logoutLoading = false;
        });
        builder.addCase(getDevelopers.fulfilled, (state, {payload: developers}) => {
            state.developers = developers;
        });
    },
});

export const usersReducer = usersSlice.reducer;

export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
export const selectLogoutLoading = (state: RootState) => state.users.logoutLoading;
export const selectDevelopers = (state: RootState) => state.users.developers;