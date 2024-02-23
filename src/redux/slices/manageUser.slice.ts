
import {IHotel} from "../types/hotel";
import {createSlice} from "@reduxjs/toolkit";
import { IUser } from "../types/user";

type IInitialState = {
    users: IUser[];
    userDetail: IUser;
    isLoading: boolean;
    isError: boolean;
    message: string;
}

const initialState: IInitialState = {
    users: [],
    userDetail:{},
    isLoading: false,
    isError: false,
    message: '',
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

const getListUserPending = requestPending;
const getListUserError = requestError;
const getUserDetailPending = requestPending;
const getUserDetailError = requestError;
const createUserError = requestError;
const createUserPending = requestPending;

const getListUserSuccess = (
    state: IInitialState,
    action: {
        type: string;
        payload: IHotel[];
    }
) => {
    state.users = action.payload;
    state.isLoading = false;
}

const getUserDetailSuccess = (
    state: IInitialState,
    action: {
        type: string;
        payload: IHotel;
    }
) => {
    state.userDetail = action.payload;
    state.isLoading = false;
};


const createUserSuccess = (
    state: IInitialState,
    action: {
        type: string;
        payload: IHotel;
    }
) => {
    state.users.push(action.payload);
    state.isLoading = false;
    state.isError = false;
}


const manageUser = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        getListUserError,
        getListUserPending,
        getListUserSuccess,
        getUserDetailError,
        getUserDetailPending,
        getUserDetailSuccess,
        createUserError,
        createUserPending,
        createUserSuccess
       
    }
})

export default manageUser.reducer;

export const manageUserActions = manageUser.actions;