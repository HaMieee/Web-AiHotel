import { put, takeLatest, call } from 'redux-saga/effects';
import axiosInstance from '../../services/axios.service';
import { manageCustomerActions } from '../slices/manageCustomer.slice';
import { get} from 'lodash';
import { toast } from 'react-toastify';

const getListCustomer = async () => {
    return axiosInstance.get('/api/auth/list-user', {
        params: {
            per_page: 5,
            type: 'customer'
        }
    })
}



const handleGetListCustomer = function* () {
    try {
        yield put ({
            type: manageCustomerActions.getListCustomerPending.type,
        })
        const response = yield call(getListCustomer);
        if(response.data.statusCode ===  200) {
            yield put({
                type: manageCustomerActions.getListCustomerSuccess.type,
                payload: response.data.data
            })
        }
    } catch(err) {
        yield put({
            type:manageCustomerActions.getListCustomerError.type,
            payload: {message: get(err, 'message')},
        })
        toast.error(get(err, 'message'))
    }
}

const manageCustomerSaga = function* () {
    yield takeLatest(
        `${manageCustomerActions.getListCustomerPending}_saga`,
        handleGetListCustomer
    )
}

export default manageCustomerSaga