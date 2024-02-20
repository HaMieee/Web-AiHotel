import { fork } from 'redux-saga/effects';
import testSaga from "./test.saga";
import authSaga from "./auth.saga";
import manageHotelSaga from "./manageHotel.saga";

const rootSaga = function* () {
    yield fork(testSaga)
    yield fork(authSaga)
    yield fork(manageHotelSaga)
};

export default rootSaga;