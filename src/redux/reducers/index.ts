import {combineReducers} from "@reduxjs/toolkit";
import testReducer from '../slices/test.slice';
import authReducer from '../slices/auth.slice';

const rootReducer = combineReducers({
    test: testReducer,
    auth: authReducer,
})

export default rootReducer;