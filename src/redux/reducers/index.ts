import {combineReducers} from "@reduxjs/toolkit";
import testReducer from '../slices/test.slice';
import authReducer from '../slices/auth.slice';
import manageHotelReducer from "../slices/manageHotel.slice";
import manageRoomTypeReducer from "../slices/manageRoomType.slice";
import manageRoomReducer from "../slices/manageRoom.slice";
import manageUserSliceReducer from "../slices/manageUser.slice";

const rootReducer = combineReducers({
    test: testReducer,
    auth: authReducer,
    manageHotel: manageHotelReducer,
    manageRoomType: manageRoomTypeReducer,
    manageRoom: manageRoomReducer,
    manageUser: manageUserSliceReducer,
})

export default rootReducer;