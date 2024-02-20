import axiosInstance from '../../services/axios.service';
import {put, call, takeLatest} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import {get} from "lodash";
import {manageHotelActions} from "../slices/manageHotel.slice";

const getListHotel = async () => {
    return axiosInstance.get('/api/hotel/list-hotels')
}

const getHotel = async (hotelId: number) => {
    return axiosInstance.get('/api/hotel/one-hotel', {
        params: {
            hotel_id: hotelId,
        }
    })
}

const handleGetListHotel = function* () {
    try {
        yield put({
            type: manageHotelActions.getListHotelPending.type,
        })
        const response = yield call(getListHotel);
        if (response.data.statusCode === 200) {
            yield put({
                type: manageHotelActions.getListHotelSuccess.type,
                payload: response.data.data,
            })
        }
    } catch (err) {
        yield put({
            type: manageHotelActions.getListHotelError.type,
            payload: {message: get(err, 'message')},
        })
        toast.error(get(err, 'message'));
    }
};

const handleGetHotel = function* (action) {
    try {
        yield put({
            type: manageHotelActions.getHotelDetailPending.type,
        })
        const response = yield call(getHotel, action.payload);
        if (response.data.statusCode === 200) {
            yield put({
                type: manageHotelActions.getHotelDetailSuccess.type,
                payload: response.data.data,
            })
        }
    } catch (err) {
        yield put({
            type: manageHotelActions.getHotelDetailError.type,
            payload: {message: get(err, 'message')},
        })
        toast.error(get(err, 'message'));
    }
}

const manageHotelSaga = function* () {
    yield takeLatest(
        `${manageHotelActions.getListHotelPending}_saga`,
        handleGetListHotel,
    );
    yield takeLatest(
        `${manageHotelActions.getHotelDetailPending}_saga`,
        handleGetHotel,
    );
}

export default manageHotelSaga;