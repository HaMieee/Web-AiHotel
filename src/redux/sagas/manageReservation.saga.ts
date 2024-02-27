import {IReservationCreate} from "../types/dtos/createReservation";
import axiosInstance from '../../services/axios.service';
import {put, call, takeLatest} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import {get} from "lodash";
import {manageReservationActions} from "../slices/manageReservation.slice";

const createReservation = (payload: IReservationCreate) => {
    return axiosInstance.post('/api/reservation/create', payload)
};

const handleCreateReservation = function* (action) {
    try {
        yield put({
            type: manageReservationActions.createReservationPending.type,
        })
        const response = yield call(createReservation, action.payload);
        console.log(response)
        if (response.data.statusCode === 200) {
            yield put({
                type: manageReservationActions.createReservationSuccess.type,
                payload: response.data.data,
            })
            toast.success(`Đặt phòng thành công!`);
        }
    } catch (err) {
        yield put({
            type: manageReservationActions.createReservationError.type,
            payload: {message: get(err, 'response.data.message')},
        })
        const errorData = get(err, 'response.data.errors', {});
        const errorMessages = Object.values(errorData).flat();

        errorMessages.forEach((messageErr) => {
            toast.error(messageErr + '');
        });
    }
};

const manageReservationSaga = function* () {
    yield takeLatest(
        `${manageReservationActions.createReservationPending}_saga`,
        handleCreateReservation,
    );
}

export default manageReservationSaga;