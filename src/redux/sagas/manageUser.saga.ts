import { put, takeLatest, call } from 'redux-saga/effects';
import axiosInstance from '../../services/axios.service';
import { get} from 'lodash';
import { toast } from 'react-toastify';
import { ICreateUser } from '../types/dtos/createUser';
import { manageUserActions } from '../slices/manageUser.slice';

const getListUser = async (payload: {
    per_page: number;
    page: number;
    role_type: string;
}) => {
    return axiosInstance.get('/api/auth/list-user', {
        params: {
            per_page: payload.per_page,
            page: payload.page,
            type: payload.role_type
        }
    })
}

const createUser = async (createUser: ICreateUser) => {
    console.log(createUser);
    
    return axiosInstance.post('/api/auth/create-user', createUser)
}

const handleGetListUser = function* (action) {
    try {
        yield put ({
            type: manageUserActions.getListUserPending.type,
        })
        const response = yield call(getListUser, action.payload);
        if(response.data.statusCode ===  200) {
            yield put({
                type: manageUserActions.getListUserSuccess.type,
                payload: response.data.data
            })
            // toast.success('Danh sách người dùng ')
        }
        
    } catch(err) {
        yield put({
            type:manageUserActions.getListUserError.type,
            payload: {message: get(err, 'message')},
        })
        console.log(err);
        
        toast.error(get(err, 'message'))
    }
}

const handleCreateUser = function* (action) {
    try{
        yield put ({
            type: manageUserActions.createUserPending.type,
        })
        const response = yield call(createUser, action.payload);
        if(response.data.statusCode === 200) {
            yield put({
                type: manageUserActions.createUserSuccess.type,
                payload: response.data.data
            })
            toast.success('Bạn đã thêm người dùng thành công')
        }
    } catch(err) {
        yield put ({
            type: manageUserActions.createUserError.type,
            payload: {message: get(err, 'message')},
        })
        const errorData = get(err, 'response.data.errors', {});
        const errorMessages = Object.values(errorData).flat();
        const errorMessage = errorMessages.join('\t');

        errorMessages.forEach((messageErr) => {
            toast.error(messageErr + '');
        });
    }
}

const manageUserSaga = function* () {
    yield takeLatest(
        `${manageUserActions.getListUserPending}_saga`,
        handleGetListUser
    ) 
    yield takeLatest(
        `${manageUserActions.createUserPending}_saga`,
        handleCreateUser
    )
}

export default manageUserSaga