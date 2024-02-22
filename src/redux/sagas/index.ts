import { fork } from 'redux-saga/effects';
import testSaga from "./test.saga";
import authSaga from "./auth.saga";
import manageHotelSaga from "./manageHotel.saga";
import manageRoomTypeSaga from "./manageRoomType.saga";
import manageRoomSaga from "./manageRoom.saga";
import manageCustomerSaga from './managaCustomer.saga';

const rootSaga = function* () {
    yield fork(testSaga)
    yield fork(authSaga)
    yield fork(manageHotelSaga)
    yield fork(manageCustomerSaga)
    yield fork(manageRoomTypeSaga)
    yield fork(manageRoomSaga)
};

export default rootSaga;