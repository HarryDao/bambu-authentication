/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import validator from 'validator';
import { signUp } from '../actions';

class Signup extends React.PureComponent {
    state = {
        email: '',
        password: '',
        error: null,
    }

    onEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    onPasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    validate = () => {
        const { email, password } = this.state;
        let error = null;
        if (!validator.isEmail(email)) {
            error = 'Email is invalid';
        }
        else if (!password) {
            error = 'Password cannot be blank';
        }
        this.setState({ error });
        return !error;
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        if (!this.validate()) return;
        const { email, password } = this.state;
        this.props.signUp({ email, password });
    }

    onSignInClick = (e) => {
        this.props.history.push('/signin');
    }

    render() {
        const { email, password } = this.state;
        const { loading, isSignedUp, error } = this.props;

        return (
            <div className='Signup'>
                <h4>Sign up</h4>
                <form>
                    <input
                        value={email}
                        placeholder='Enter your email...'
                        onChange={this.onEmailChange}
                    />
                    <input
                        type='password'
                        value={password}
                        placeholder='Enter your password...'
                        onChange={this.onPasswordChange}
                    />
                    {!isSignedUp && (
                        <>
                            {!loading && (
                                <div className='button'>
                                    <button
                                        type='submit'
                                        onClick={this.onFormSubmit}
                                    >
                                        Sign up
                                    </button>
                                </div>
                            )}

                            {loading && (
                                <div className='loading'>
                                    <PulseLoader size={5}/>
                                </div>
                            )}

                            {(error || this.state.error) && (
                                <p className='error'>{error || this.state.error}</p>
                            )}
                            
                            <p className='switch'>Already have an account? <a href='#' onClick={this.onSignInClick}>Sign in now</a></p>
                        </>
                    )}

                    {isSignedUp && (
                        <p className='success'>A verification email has been sent your inbox</p>
                    )}
                    

                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.signUpLoading,
        isSignedUp: state.auth.isSignedUp,
        error: state.auth.signUpError
    }
}

export default connect(
    mapStateToProps,
    {
        signUp
    }
)(Signup);