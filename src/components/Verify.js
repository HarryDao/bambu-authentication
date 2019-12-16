import React from 'react';
import { connect } from 'react-redux';
import qs from 'query-string'; 
import { PulseLoader } from 'react-spinners';
import { verify } from '../actions';

class Verify extends React.PureComponent {
    componentDidMount() {
        const { token } = qs.parse(this.props.location.search);
        this.props.verify({ token });
    }

    componentDidUpdate() {
        if (this.props.isVerified) {
            this.props.history.push('/signin');
        }
    }

    render() {
        const { loading, error } = this.props;

        return (
            <div className='Verify'>
                {loading && (
                    <div className='loading'>
                        <PulseLoader size={7}/>
                    </div>
                )}
                {error && (
                    <p className='error'>
                        Something went wrong
                    </p>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.verifyLoading,
        isVerified: state.auth.isVerified,
        error: state.auth.verifyError,
    };
}

export default connect(
    mapStateToProps,
    {
        verify
    }
)(Verify);