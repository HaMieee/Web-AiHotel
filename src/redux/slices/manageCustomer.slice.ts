import { ICustomer } from "../types/customer";
import {IHotel} from "../types/hotel";
import {createSlice} from "@reduxjs/toolkit";

type IInitialState = {
    customers: ICustomer[];
    customerDetail: ICustomer;
    isLoading: boolean;
    isError: boolean;
    message: string;
}

const initialState: IInitialState = {
    customers: [],
    customerDetail:{},
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

const getListCustomerPending = requestPending;
const getListCustomerError = requestError;
const getCustomerDetailPending = requestPending;
const getCustomerDetailError = requestError;

const getListCustomerSuccess = (
    state: IInitialState,
    action: {
        type: string;
        payload: IHotel[];
    }
) => {
    state.customers = action.payload;
    state.isLoading = false;
}

const getCustomerDetailSuccess = (
    state: IInitialState,
    action: {
        type: string;
        payload: IHotel;
    }
) => {
    state.customerDetail = action.payload;
    state.isLoading = false;
};


const manageCustomer = createSlice({
    name: 'customers',
    initialState: initialState,
    reducers: {
        getListCustomerPending,
        getListCustomerError,
        getListCustomerSuccess,
        getCustomerDetailError,
        getCustomerDetailPending,
        getCustomerDetailSuccess,
    }
})

export default manageCustomer.reducer;

export const manageCustomerActions = manageCustomer.actions;