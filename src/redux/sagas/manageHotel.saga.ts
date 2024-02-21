import axiosInstance from '../../services/axios.service';
import {put, call, takeLatest} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import {get} from "lodash";
import {manageHotelActions} from "../slices/manageHotel.slice";
import {IUpdateHotel} from "../types/dtos/updateHotel";
import {ICreateHotel} from "../types/dtos/createHotel";

const getListHotel = async () => {
    return axiosInstance.get('/api/hotel/list-hotels', {
        params: {
            per_page: 5
        }
    })
}

const getHotel = async (hotelId: number) => {
    return axiosInstance.get('/api/hotel/detail', {
        params: {
            hotel_id: hotelId,
        }
    })
}

const createHotel = async (createHotel: ICreateHotel) => {
    return axiosInstance.post('/api/hotel/create-hotel', createHotel)
}

const updateHotel = async (updateHotelData: IUpdateHotel) => {
    return axiosInstance.put('api/hotel/update-hotel', updateHotelData)
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
        toast.error(get(err, 'response.data.message'));
    }
}

const handleCreateHotel = function* (action) {
    try {
        yield put({
            type: manageHotelActions.createHotelPending.type,
        })
        const response = yield call(createHotel, action.payload);
        if (response.data.statusCode === 200) {
            yield put({
                type: manageHotelActions.createHotelSuccess.type,
                payload: response.data.data,
            })
            toast.success(`thêm mới thành công!`);
        }
    } catch (err) {
        yield put({
            type: manageHotelActions.createHotelPending.type,
            payload: {message: get(err, 'response.data.message')},
        })
        toast.error(get(err, 'response.data.message'));
    }
}

const handleUpdateHotel = function* (action) {
    try {
        yield put({
            type: manageHotelActions.updateHotelPending.type,
        })
        const response = yield call(updateHotel, action.payload)
        if (response.data.statusCode === 200) {
            yield put({
                type: manageHotelActions.updateHotelSuccess.type,
                payload: response.data.data,
            })
            toast.success(`Cập nhật thành công!`);
        }
    } catch (err) {
        yield put({
            type: manageHotelActions.updateHotelError.type,
            payload: {message: get(err, 'message')},
        })
        toast.error(get(err, 'response.data.message'));
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
    yield takeLatest(
        `${manageHotelActions.updateHotelPending}_saga`,
        handleUpdateHotel,
    );
    yield takeLatest(
        `${manageHotelActions.createHotelPending}_saga`,
        handleCreateHotel,
    )
}

export default manageHotelSaga;