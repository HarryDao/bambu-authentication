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
} from '../../actions/constants';
import reducer, { INITIAL_STATE } from '../authReducer';

describe('authReducer', function() {
    it('return initial state by default', function() {
        expect(reducer(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
    });

    it(`work on 1 ${SIGN_IN_LOADING}`, function() {
        expect(reducer(INITIAL_STATE, { type: SIGN_IN_LOADING })).toEqual({
            ...INITIAL_STATE,
            signInLoading: true,
            signInError: null,
        });
    });

    it(`work on ${SIGN_IN_SUCCESS}`, function() {
        expect(reducer(INITIAL_STATE, {
            type: SIGN_IN_SUCCESS,
            payload: 11
        })).toEqual({
            ...INITIAL_STATE,
            signInLoading: false,
            signInError: null,
            token: 11   
        })
    });

    it(`work on ${SIGN_IN_FAILURE}`, function() {
        expect(reducer(INITIAL_STATE, {
            type: SIGN_IN_FAILURE,
            payload: 'error'
        })).toEqual({
            ...INITIAL_STATE,
            signInLoading: false,
            signInError: 'error'
        });
    });

    it(`work on ${SIGN_UP_LOADING}`, function() {
        expect(reducer(INITIAL_STATE, {
            type: SIGN_UP_LOADING,
        })).toEqual({
            ...INITIAL_STATE,
            signUpLoading: true,
            signUpError: null,           
        });
    });

    it(`work on ${SIGN_UP_SUCCESS}`, function() {
        expect(reducer(INITIAL_STATE, {
            type: SIGN_UP_SUCCESS
        })).toEqual({
            ...INITIAL_STATE,
            signUpLoading: false,
            signUpError: null,
            isSignedUp: true           
        })
    });

    it(`work on ${SIGN_UP_FAILURE}`, function() {
        expect(reducer(INITIAL_STATE, {
            type: SIGN_UP_FAILURE,
            payload: '11'
        })).toEqual({
            ...INITIAL_STATE,
            signUpLoading: false,
            signUpError: '11'           
        });
    });

    it(`work on ${VERIFY_LOADING}`, function() {
        expect(reducer(INITIAL_STATE, {
            type: VERIFY_LOADING,
        })).toEqual({
            ...INITIAL_STATE,
            verifyLoading: true,
            verifyError: false,
        });
    });

    it(`work on ${VERIFY_FAILURE}`, function() {
        expect(reducer(INITIAL_STATE, {
            type: VERIFY_FAILURE
        })).toEqual({
            ...INITIAL_STATE,
            verifyLoading: false,
            verifyError: true            
        })
    });

    it(`work on ${VERIFY_SUCCESS}`, function() {
        expect(reducer(INITIAL_STATE, {
            type: VERIFY_SUCCESS
        })).toEqual({
            ...INITIAL_STATE,
            verifyLoading: false,
            verifyError: false,
            isVerified: true,            
        })
    })
});