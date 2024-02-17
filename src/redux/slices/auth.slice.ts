import {IUser} from "../types/user";
import {createSlice} from "@reduxjs/toolkit";

type IInitialState = {
    userInfo: IUser;
    token: string;
    isLoading: boolean;
    isError: boolean;
    message: string;
}

const initialState: IInitialState = {
    userInfo: {},
    token: '',
    isLoading: false,
    isError: false,
    message: ''
}

const requestPending = (state: IInitialState) => {
    state.isLoading = true;
    state.isError = false;
    state.message = '';
};

const requestError = (
    state: IInitialState,
    action: { type: string; payload: { message: string } },
) => {
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload.message;
};

const loginPending = requestPending;
const loginError = requestError;
const logoutPending = requestPending;
const logoutError = requestError;
const registerPending = requestPending;
const registerError = requestError;

const loginSuccess = (
    state: IInitialState,
    action: {
        type: string;
        payload: string;
    },
) => {
    state.token = action.payload;
    state.isLoading = false;
}

const logoutSuccess = (
    state: IInitialState,
    action: {
        type: string;
        payload: string;
    },
) => {
    state.token = action.payload;
    state.isLoading = false;
    localStorage.clear();
}

const registerSuccess = (
    state: IInitialState,
    action: {
        type: string;
        payload: string;
    }
) => {
    state.token = action.payload;
    state.isLoading = false;
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        loginPending,
        loginError,
        loginSuccess,
        logoutPending,
        logoutError,
        logoutSuccess,
        registerPending,
        registerError,
        registerSuccess,
    }
})

export default authSlice.reducer;

export const authActions = authSlice.actions;