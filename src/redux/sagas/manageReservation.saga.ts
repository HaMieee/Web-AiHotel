import {IReservationCreate} from "../types/dtos/createReservation";
import axiosInstance from '../../services/axios.service';
import {put, call, takeLatest} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import {get} from "lodash";
import {manageReservationActions} from "../slices/manageReservation.slice";

const createReservation = async (payload: IReservationCreate) => {
    return axiosInstance.post('/api/reservation/create', payload)
};

const getListReservation = async (payload: {
    per_page: number;
    page: number;
}) => {
    return axiosInstance.get('/api/reservation/list', {
        params: {
            per_page: payload.per_page,
            page: payload.page,
        }
    })
};

const handleCreateReservation = function* (action) {
    try {
        yield put({
            type: manageReservationActions.createReservationPending.type,
        })
        const response = yield call(createReservation, action.payload);
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

const handleGetListReservation = function* (action) {
    try {
        yield put({
            type: manageReservationActions.getListReservationPending.type,
        })
        const response = yield call(getListReservation, action.payload);
        if (response.data.statusCode === 200) {
            yield put({
                type: manageReservationActions.getListReservationSuccess.type,
                payload: {
                    reservations: response.data.data,
                    meta: response.data.meta,
                },
            })
        }
    } catch (err) {
        yield put({
            type: manageReservationActions.getListReservationError.type,
            payload: {message: get(err, 'response.data.message')},
        })
        const errorData = get(err, 'response.data.errors', {});
        const errorMessages = Object.values(errorData).flat();

        errorMessages.forEach((messageErr) => {
            toast.error(messageErr + '');
        });
    }
}

const manageReservationSaga = function* () {
    yield takeLatest(
        `${manageReservationActions.createReservationPending}_saga`,
        handleCreateReservation,
    );
    yield takeLatest(
        `${manageReservationActions.getListReservationPending}_saga`,
        handleGetListReservation,
    );
}

export default manageReservationSaga;