import {IHotel} from "../types/hotel";
import {createSlice} from "@reduxjs/toolkit";

type IInitialState = {
    hotels: IHotel[];
    hotelDetail: IHotel;
    isLoading: boolean;
    isError: boolean;
    message: string;
}

const initialState: IInitialState = {
    hotels: [],
    hotelDetail: {},
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
const getHotelDetailPending = requestPending;
const getHotelDetailError = requestError;
const updateHotelPending = requestPending;
const updateHotelError = requestError;

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

const getHotelDetailSuccess = (
    state: IInitialState,
    action: {
        type: string;
        payload: IHotel;
    }
) => {
    state.hotelDetail = action.payload;
    state.isLoading = false;
}

const updateHotelSuccess = (
    state: IInitialState,
    action: {
        type: string;
        payload: IHotel;
    }
) => {
    state.hotelDetail = action.payload;
    state.isLoading = false;
}

const manageHotel = createSlice({
    name: 'hotels',
    initialState: initialState,
    reducers: {
        getListHotelPending,
        getListHotelError,
        getListHotelSuccess,
        getHotelDetailPending,
        getHotelDetailError,
        getHotelDetailSuccess,
        updateHotelPending,
        updateHotelError,
        updateHotelSuccess,
    }
})

export default manageHotel.reducer;

export const manageHotelActions = manageHotel.actions;