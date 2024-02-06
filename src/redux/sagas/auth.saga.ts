import {put, call, takeLatest} from 'redux-saga/effects';
import {authActions} from "../slices/auth.slice";
import {ILogin} from "../types/login";
import {toast} from 'react-toastify';
import {get} from "lodash";
import axiosInstance from '../../services/axios.service';

const login = async (dataLogin: ILogin) => {
    return axiosInstance.post('api/auth/login', dataLogin)
}

const logout = async () => {
    return axiosInstance.get('api/auth/logout')
}

const handleLogin = function* (action) {
    try {
        yield put({
            type: authActions.loginPending.type,
        })
        const response = yield call(login, action.payload);
        if (response.status === 200) {
            const resultLogin = response.data.data;
            const token = resultLogin.access_token;
            yield put({
                type: authActions.loginSuccess.type,
                payload: token,
            })
            console.log(token)
            toast.success(`Welcome to my web!`);
        } else {
            throw new Error(response.data.message || 'Server error');
        }
    } catch (err) {
        yield put({
            type: authActions.loginError.type,
            payload: {message: get(err, 'message')},
        })
        toast.error(get(err, 'message'));
    }
}

const handleLogout = function* () {
    try {
        yield put({
            type: authActions.logoutPending.type,
        })
        const response = yield call(logout);
        if (response.status === 200) {
            yield put({
                type: authActions.logoutSuccess.type,
            })
        } else {
            throw new Error(response.data.message || 'Server error');
        }
    } catch (err) {
        yield put({
            type: authActions.logoutError.type,
            payload: {message: get(err, 'message')},
        })
        toast.error(get(err, 'message'));
    }
}

const authSaga = function* () {
    yield takeLatest(
        `${authActions.loginPending.type}_saga`,
        handleLogin,
    );
    yield takeLatest(
        `${authActions.logoutPending.type}_saga`,
        handleLogout,
    )
};

export default authSaga;