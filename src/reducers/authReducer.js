import {
    SIGN_IN_LOADING,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    SIGN_UP_LOADING,
    SIGN_UP_FAILURE,
    SIGN_UP_SUCCESS,
    VERIFY_LOADING,
    VERIFY_SUCCESS,
    VERIFY_FAILURE,
} from '../actions/constants';

export const INITIAL_STATE = {
    signInLoading: false,
    token: null,
    signInError: null,
    signUpLoading: false,
    isSignedUp: false,
    signUpError: null,
    verifyLoading: false, 
    isVerified: false,
    verifyError: false,
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN_LOADING:
            return {
                ...state,
                signInLoading: true,
                signInError: null,
            }
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                signInLoading: false,
                signInError: null,
                token: action.payload
            }
        case SIGN_IN_FAILURE:
            return {
                ...state,
                signInLoading: false,
                signInError: action.payload,
            }
        case SIGN_UP_LOADING:
            return {
                ...state,
                signUpLoading: true,
                signUpError: null,
            }
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                signUpLoading: false,
                signUpError: null,
                isSignedUp: true
            }
        case SIGN_UP_FAILURE:
            return {
                ...state,
                signUpLoading: false,
                signUpError: action.payload
            }
        case VERIFY_LOADING:
            return {
                ...state,
                verifyLoading: true,
                verifyError: false,
            }
        case VERIFY_FAILURE:
            return {
                ...state,
                verifyLoading: false,
                verifyError: true
            }
        case VERIFY_SUCCESS:
            return {
                ...state,
                verifyLoading: false,
                verifyError: false,
                isVerified: true,
            }
        default:
            return state;
    }
}