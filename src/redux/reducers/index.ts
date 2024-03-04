import {combineReducers} from "@reduxjs/toolkit";
import testReducer from '../slices/test.slice';
import authReducer from '../slices/auth.slice';
import manageHotelReducer from "../slices/manageHotel.slice";
import manageRoomTypeReducer from "../slices/manageRoomType.slice";
import manageRoomReducer from "../slices/manageRoom.slice";
import manageUserSliceReducer from "../slices/manageUser.slice";
import manageReservationReducer from "../slices/manageReservation.slice";
import manageServiceReducer from "../slices/manageService.slice";

const rootReducer = combineReducers({
    test: testReducer,
    auth: authReducer,
    manageHotel: manageHotelReducer,
    manageRoomType: manageRoomTypeReducer,
    manageRoom: manageRoomReducer,
    manageUser: manageUserSliceReducer,
    manageReservation: manageReservationReducer,
    manageService: manageServiceReducer,
})

export default rootReducer;