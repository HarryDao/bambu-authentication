import axios from 'axios';
import {
    SIGN_IN_LOADING,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    SIGN_UP_LOADING,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    VERIFY_LOADING,
    VERIFY_SUCCESS,
    VERIFY_FAILURE,
} from './constants';
import {
    SERVER_URL,
} from '../config';

export const signIn = ({ email, password }) => async dispatch => {
    try {
        dispatch({ type: SIGN_IN_LOADING });
        const { data } = await axios.post(`${SERVER_URL}/api/signin`, {
            email,
            password
        });

        const { token } = data;
        
        dispatch({
            type: SIGN_IN_SUCCESS,
            payload: token
        });
    }
    catch(error) {
        handleError(dispatch, SIGN_IN_FAILURE, error);
    }
}

export const signUp = ({ email, password }) => async dispatch => {
    try {
        dispatch({ type: SIGN_UP_LOADING });
        await axios.post(`${SERVER_URL}/api/signup`, {
            email,
            password
        });
        dispatch({ type: SIGN_UP_SUCCESS });
    }
    catch(error) {
        handleError(dispatch, SIGN_UP_FAILURE, error);
    }
}

export const verify = ({ token }) => async dispatch => {
    try {
        dispatch({ type: VERIFY_LOADING });
        await axios.post(`${SERVER_URL}/api/verify`, { token });
        dispatch({ type: VERIFY_SUCCESS });
    }
    catch(error) {
        handleError(dispatch, VERIFY_FAILURE, error);
    }
}

const handleError = (dispatch, type, error) => {
    try {
        dispatch({
            type,
            payload: error.response.data.error
        })
    }
    catch(error) {
        dispatch({
            type,
            payload: 'Something went wrong',
        })
    }
}