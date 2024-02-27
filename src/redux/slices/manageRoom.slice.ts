import {IRoom} from "../types/room";
import {IPaginateResponse} from "../types/page";
import {createSlice} from "@reduxjs/toolkit";

type IInitialState = {
    rooms: IRoom[];
    isLoading: boolean;
    isError: boolean;
    message: string;
    paginate: IPaginateResponse;
};

const initialState: IInitialState = {
    rooms: [],
    isLoading: false,
    isError: false,
    message: '',
    paginate: {
        count: 0,
        current_page: 0,
        per_page: 0,
        total: 0,
        total_pages: 0,
        links: {},
    },
};

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

const getListRoomPending = requestPending;
const getListRoomError = requestError;
const createRoomPending = requestPending;
const createRoomError = requestError;

const getListRoomSuccess = (
    state: IInitialState,
    action: {
        type: string;
        payload: {
            rooms: IRoom[],
            meta: IPaginateResponse,
        };
    }
) => {
    state.rooms = action.payload.rooms;
    state.isLoading = false;
    state.isError = false;
}


const createRoomSuccess = (
    state: IInitialState,
    action: {
        type: string;
        payload: IRoom;
    }
) => {
    state.rooms.push(action.payload);
    state.isLoading = false;
    state.isError = false;
}

const manageRoomSlice = createSlice({
    name: 'rooms',
    initialState: initialState,
    reducers: {
        getListRoomPending,
        getListRoomError,
        getListRoomSuccess,
        createRoomPending,
        createRoomError,
        createRoomSuccess,
    }
});

export default manageRoomSlice.reducer;

export const manageRoomActions = manageRoomSlice.actions;