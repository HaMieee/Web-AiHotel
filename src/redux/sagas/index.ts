import { fork } from 'redux-saga/effects';
import testSaga from "./test.saga";
import authSaga from "./auth.saga";

const rootSaga = function* () {
    yield fork(testSaga)
    yield fork(authSaga)
};

export default rootSaga;