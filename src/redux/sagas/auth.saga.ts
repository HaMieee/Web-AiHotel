import {put, call, takeLatest} from 'redux-saga/effects';
import {authActions} from "../slices/auth.slice";
import {ILogin} from "../types/login";
import {toast} from 'react-toastify';
import {get} from "lodash";
import axiosInstance from '../../services/axios.service';
import { IRegister } from '../types/register';

const login = async (dataLogin: ILogin) => {
    return axiosInstance.post('api/auth/login', dataLogin)
}

const userInfo = async () => {
    return axiosInstance.get('api/auth/my-information')
}

const logout = async () => {
    return axiosInstance.get('api/auth/logout')
}

const register = async (dataRegister: IRegister) => {
    return axiosInstance.post('api/auth/sign-up-for-customer', dataRegister)
}

const handleLogin = function* (action) {
    try {
        yield put({
            type: authActions.loginPending.type,
        })
        const response = yield call(login, action.payload);

        if (response.data.statusCode === 200) {
            const resultLogin = response.data.data;
            const token = resultLogin.access_token;
            yield put({
                type: authActions.loginSuccess.type,
                payload: token,
            })
            yield put({
                type: `${authActions.getInfoPending}_saga`,
            })
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

const handleGetInfo = function* () {
    try {
        yield put({
            type: authActions.getInfoPending.type,
        })
        const response = yield call(userInfo);
        if (response.data.statusCode === 200) {
            yield put({
                type: authActions.getInfoSuccess.type,
                payload: response.data.data,
            })
        } else {
            throw new Error(response.data.message || 'Server error');

        }
    } catch (err) {
        yield put({
            type: authActions.getInfoError.type,
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

const handleRegister = function* (action) {
    try {
        yield put({
            type: authActions.registerPending.type,
        })
        const response = yield call(register, action.payload)
        console.log('response: ', response);
        
        if (response.data.statusCode === 200) {
            const token = response.data.data.access_token;
            console.log('res register: ', token);

            yield put({
                type: authActions.registerSuccess.type,
                payload: token,
            })
            toast.success(`Welcome to my web!`);
        } else {
            throw new Error(response.data.message || 'Server error');
        }
    } catch (err) {
        yield put({
            type: authActions.registerError.type,
            payload: {message: get(err, 'message')},
        })
        toast.error(get(err, 'message'));
        // console.log('error: ', err);
    }
}

const authSaga = function* () {
    yield takeLatest(
        `${authActions.loginPending}_saga`,
        handleLogin,
    );
    yield takeLatest(
        `${authActions.getInfoPending}_saga`,
        handleGetInfo,
    )
    yield takeLatest(
        `${authActions.logoutPending}_saga`,
        handleLogout,
    );
    yield takeLatest(
        `${authActions.registerPending}_saga`,
        handleRegister,
    );
};

export default authSaga;