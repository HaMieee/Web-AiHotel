import axiosInstance from '../../services/axios.service';
import {put, call, takeLatest} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import {get} from "lodash";
import {manageRoomActions} from "../slices/manageRoom.slice";
import { ICreateRoom } from '../types/createRoom';

const getListRoom = async (payload: {
    per_page?: number;
    page?: number;
}) => {
    return axiosInstance.get('/api/room/get-list', {
        params: {
            per_page: payload.per_page,
            page: payload.page,
        }
    })
}

const createRoom = async (createRoom: ICreateRoom) => {
    
    return axiosInstance.post('/api/room/create', createRoom)
}

const handleCreateRoom = function* (action) {
    try{
        yield put ({
            type: manageRoomActions.createRoomPending.type,
        })
        const response = yield call(createRoom, action.payload);
        if(response.data.statusCode === 200) {
            yield put({
                type: manageRoomActions.createRoomSuccess.type,
                payload: response.data.data
            })
            toast.success('Bạn đã thêm phòng thành công')
        }
    } catch(err) {
        yield put ({
            type: manageRoomActions.createRoomError.type,
            payload: {message: get(err, 'message')},
        })
        const errorData = get(err, 'response.data.errors', {});
        const errorMessages = Object.values(errorData).flat();

        errorMessages.forEach((messageErr) => {
            toast.error(messageErr + '');
        });
    }
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
                payload: {
                    rooms: response.data.data,
                    meta: response.data.meta,
                },
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
    yield takeLatest(
        `${manageRoomActions.createRoomPending}_saga`,
        handleCreateRoom
    )
};

export default manageRoomSaga;