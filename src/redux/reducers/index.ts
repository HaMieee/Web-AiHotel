import {combineReducers} from "@reduxjs/toolkit";
import testReducer from '../slices/test.slice';
import authReducer from '../slices/auth.slice';
import manageHotelReducer from "../slices/manageHotel.slice";

const rootReducer = combineReducers({
    test: testReducer,
    auth: authReducer,
    manageHotels: manageHotelReducer,
})

export default rootReducer;