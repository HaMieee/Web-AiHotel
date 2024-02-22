import {combineReducers} from "@reduxjs/toolkit";
import testReducer from '../slices/test.slice';
import authReducer from '../slices/auth.slice';
import manageHotelReducer from "../slices/manageHotel.slice";
import manageRoomTypeReducer from "../slices/manageRoomType.slice";
import manageCustomerReducer from "../slices/manageCustomer.slice";

const rootReducer = combineReducers({
    test: testReducer,
    auth: authReducer,
    manageHotel: manageHotelReducer,
    manageRoomType: manageRoomTypeReducer,
    manageCustomer: manageCustomerReducer,
})

export default rootReducer;