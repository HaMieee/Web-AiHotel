import {IHotel} from "../types/hotel";
import {createSlice} from "@reduxjs/toolkit";

type IInitialState = {
    hotels: IHotel[];
    isLoading: boolean;
    isError: boolean;
    message: string;
}

const initialState: IInitialState = {
    hotels: [],
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

const getListHotelPending = requestPending;
const getListHotelError = requestError;

const getListHotelSuccess = (
    state: IInitialState,
    action: {
        type: string;
        payload: IHotel[];
    }
) => {
    state.hotels = action.payload;
    state.isLoading = false;
}

const manageHotel = createSlice({
    name: 'hotels',
    initialState: initialState,
    reducers: {
        getListHotelPending,
        getListHotelError,
        getListHotelSuccess,
    }
})

export default manageHotel.reducer;

export const manageHotelActions = manageHotel.actions;