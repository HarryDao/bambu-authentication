import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import { PulseLoader } from 'react-spinners';
import { signIn } from '../actions';

class Signin extends React.PureComponent {
    state = {
        email: '',
        password: '',
        error: '',
    }

    componentDidMount() {
        if (this.props.token) {
            this.redirect();
        }
    }

    componentDidUpdate() {
        if (this.props.token) {
            this.redirect();
        }
    }

    redirect = () => {
        this.props.history.push('/');
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
        this.props.signIn({ email, password });
    }

    onSignUpClick = () => {
        this.props.history.push('/signup');
    }

    render() {
        const { email, password } = this.state;
        const { loading, error } = this.props;

        return (
            <div className='Signin'>
                <h4>Sign in</h4>
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

                    {!loading && (
                        <div className='button'>
                            <button
                                type='submit'
                                onClick={this.onFormSubmit}
                            >
                                Sign in
                            </button>
                        </div>
                    )}

                    {loading && (
                        <div className='loading'>
                            <PulseLoader size={7}/>
                        </div>
                    )}

                    {this.state.error && (
                        <p className='error'>
                            {this.state.error}
                        </p>
                    )}

                    {error && (
                        <p className='error'>
                            {error}
                        </p>
                    )}

                    <p className='switch'>Don't have an account? <a href='#' onClick={this.onSignUpClick}>Sign up now</a></p>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.signInLoading,
        token: state.auth.token,
        error: state.auth.signInError,
    }
}

export default connect(
    mapStateToProps,
    {
        signIn,
    }
)(Signin);