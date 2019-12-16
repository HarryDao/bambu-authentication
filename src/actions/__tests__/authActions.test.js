import axios from 'axios';
import { signIn, signUp, verify } from '../authActions';
import {
    SIGN_IN_LOADING,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    SIGN_UP_FAILURE,
    SIGN_UP_LOADING,
    SIGN_UP_SUCCESS,
    VERIFY_FAILURE,
    VERIFY_LOADING,
    VERIFY_SUCCESS,
} from '../constants';
import { SERVER_URL } from '../../config';

describe('authActions', function() {
    const email = 'email';
    const password = 'password';
    const token = 'token';

    describe('signIn', function() {
        let dispatch;

        beforeEach(function() {
            axios.post = jest.fn();
            dispatch = jest.fn();
        });

        afterEach(function() {
            if (axios.post) {
                axios.post.mockRestore();
            }
            if (dispatch) {
                dispatch.mockRestore();
            }
        })

        it('work correctly if no error', async function() {
            axios.post.mockImplementation(function() {
                return { data: { token } }
            })
            await signIn({ email, password })(dispatch);
            expect(dispatch.mock.calls).toEqual([
                [{ type: SIGN_IN_LOADING }],
                [{
                    type: SIGN_IN_SUCCESS,
                    payload: token
                }]
            ])  
        })

        it('work correctly if having error', async function() {
            axios.post.mockImplementation(function() {
                return new Promise((resolve, reject) => {
                    reject(new Error('error'));
                })
            })

            await signIn({ email, password })(dispatch);
            
            expect(dispatch.mock.calls).toEqual([
                [{ type: SIGN_IN_LOADING }],
                [{
                    type: SIGN_IN_FAILURE,
                    payload: 'Something went wrong'
                }]
            ])
            expect(axios.post.mock.calls).toEqual([
                [
                    `${SERVER_URL}/api/signin`, 
                    {
                        email,
                        password
                    }
                ]
            ])

        });
    });

    describe('signUp', function() {
        let dispatch;

        beforeEach(function() {
            axios.post = jest.fn();
            dispatch = jest.fn();
        });
        
        it('should work correctly if no error', async function() {
            axios.post.mockImplementation(function() {
                return null;
            });
            await signUp({ email, password })(dispatch);
            expect(dispatch.mock.calls).toEqual([
                [ { type: SIGN_UP_LOADING } ],
                [ { type: SIGN_UP_SUCCESS } ]
            ]);
            expect(axios.post.mock.calls).toEqual([
                [
                    `${SERVER_URL}/api/signup`, 
                    {
                        email,
                        password
                    }
                ]
            ])
        });

        it('should work correctly if having error', async function() {
            axios.post.mockImplementation(function() {
                throw new Error('error');
            });
            await signUp({ email, password })(dispatch);
            expect(dispatch.mock.calls).toEqual([
                [ { type: SIGN_UP_LOADING } ],
                [
                    { 
                        type: SIGN_UP_FAILURE,
                        payload: 'Something went wrong' 
                    }
                ]
            ]);
        })
    });

    describe('verify', function() {
        let dispatch;

        beforeEach(function() {
            axios.post = jest.fn();
            dispatch = jest.fn();
        });
        
        it('should work if no error', async function() {
            axios.post.mockImplementation(function() {});
            await verify({ token })(dispatch);
            expect(dispatch.mock.calls).toEqual([
                [{ type: VERIFY_LOADING }],
                [{ type: VERIFY_SUCCESS }]
            ]);
            expect(axios.post.mock.calls).toEqual([
                [
                    `${SERVER_URL}/api/verify`,
                    { token }
                ]
            ]);
        });

        it('should work if having error', async function() {
            axios.post.mockImplementation(function() {
                throw new Error('error');
            });
            await verify({ token })(dispatch);
            expect(dispatch.mock.calls).toEqual([
                [{ type: VERIFY_LOADING }],
                [{ type: VERIFY_FAILURE, payload: 'Something went wrong' }]
            ]);
        })
    });
});