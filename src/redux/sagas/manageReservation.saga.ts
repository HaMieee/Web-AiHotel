import {IReservationCreate} from "../types/dtos/createReservation";
import axiosInstance from '../../services/axios.service';
import {put, call, takeLatest} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import {get} from "lodash";
import {manageReservationActions} from "../slices/manageReservation.slice";
import { IReservationEdit } from "../types/dtos/editReservation";

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

const getReservation  = async (reservationId: number) => {    
    return axiosInstance.get('/api/reservation/detail', {
        params:{
            reservation_id: reservationId,
        }
    })
}

const editReservation  = async  (editReservation: IReservationEdit) => {
    console.log('user update: ', editReservation);
    
    return axiosInstance.put('/api/reservation/update', editReservation)

}

const handleGetReservation = function* (action) {
    try{
        yield put({
            type: manageReservationActions.getReservationPending.type,
        })

        const response = yield call( getReservation, action.payload);
        if(response.data.statusCode === 200) {
            yield put({
                type: manageReservationActions.getReservationSuccess.type,
                payload: response.data.data,
            })
        }
    } catch (err) {
        yield put({
            type: manageReservationActions.getReservationError.type,
            payload: {message: get(err, 'message')},
        })
        toast.error(get(err, 'response.data.message'))
        console.log(err)
        
    }
}
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

const handleEditReservation = function* (action) {
    try{
        yield put({
            type: manageReservationActions.editReservationPending.type,
        })
        const response = yield call(editReservation, action.payload);
        if(response.data.statusCode === 200) {
            yield put({
                type: manageReservationActions.editReservationSuccess.type,
                payload: response.data.data,
            })
            toast.success('Cập nhật đơn đặt phòng thành công')
        }
    } catch(err){
        yield put({
            type: manageReservationActions.editReservationError.type,
            payload: {message: get(err, 'message')},
        })
        toast.error(get(err, 'response.data.message'))
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
    yield takeLatest(
        `${manageReservationActions.getReservationPending}_saga`,
        handleGetReservation
    );
    yield takeLatest(
        `${manageReservationActions.editReservationPending}_saga`,
        handleEditReservation
    )
}

export default manageReservationSaga;