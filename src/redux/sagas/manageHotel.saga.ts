import axiosInstance from '../../services/axios.service';
import {put, call, takeLatest} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import {get} from "lodash";
import {manageHotelActions} from "../slices/manageHotel.slice";

const getListHotel = async () => {
    return axiosInstance.get('/api/hotel/list-hotels')
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
}

const manageHotelSaga = function* () {
    yield takeLatest(
        `${manageHotelActions.getListHotelPending}_saga`,
        handleGetListHotel,
    )
}

export default manageHotelSaga;