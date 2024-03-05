import { fork } from 'redux-saga/effects';
import testSaga from "./test.saga";
import authSaga from "./auth.saga";
import manageHotelSaga from "./manageHotel.saga";
import manageRoomTypeSaga from "./manageRoomType.saga";
import manageRoomSaga from "./manageRoom.saga";
import manageUserSaga from './manageUser.saga';
import manageReservationSaga from "./manageReservation.saga";
import manageServiceSaga from './manageService.saga';
import manageInvoiceSaga from "./manageInvoice.saga";

const rootSaga = function* () {
    yield fork(testSaga)
    yield fork(authSaga)
    yield fork(manageHotelSaga)
    yield fork(manageUserSaga)
    yield fork(manageRoomTypeSaga)
    yield fork(manageRoomSaga)
    yield fork(manageReservationSaga)
    yield fork(manageServiceSaga)
    yield fork(manageInvoiceSaga)
};

export default rootSaga;