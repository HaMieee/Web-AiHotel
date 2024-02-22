import axiosInstance from '../../services/axios.service';
import {put, call, takeLatest} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import {get} from "lodash";
import {manageRoomActions} from "../slices/manageRoom.slice";

const getListRoom = async (payload: {
    hotel_id: number;
    per_page?: number;
    page?: number;
}) => {
    return axiosInstance.get('/api/room/get-list', {
        params: {
            hotel_id: payload.hotel_id,
            per_page: payload.per_page,
            page: payload.page,
        }
    })
}

const handleGetListRoomByIdHotel = function* (action) {
    try {
        yield put({
            type: manageRoomActions.getListRoomPending.type,
        });
        const response = yield call(getListRoom, action.payload);
        if (response.data.statusCode === 200) {
            yield put({
                type: manageRoomActions.getListRoomSuccess.type,
                payload: response.data.data,
            })
        }
    } catch (err) {
        yield put({
            type: manageRoomActions.getListRoomError.type,
            payload: {message: get(err, 'response.data.message')},
        });
        toast.error(get(err, 'response.data.message'));
    }
};

const manageRoomSaga = function* () {
    yield takeLatest(
        `${manageRoomActions.getListRoomPending}_saga`,
        handleGetListRoomByIdHotel,
    );
};

export default manageRoomSaga;