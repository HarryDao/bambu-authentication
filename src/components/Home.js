import React from 'react';
import { connect } from 'react-redux';

class Home extends React.PureComponent {
    componentDidMount() {
        if (!this.props.token) {
            this.redirect();
        }   
    }

    componentDidUpdate() {
        if (!this.props.token) {
            this.redirect();
        }
    }

    redirect = () => {
        this.props.history.push('/signin');
    }

    render() {
        return (
            <div className='Home'>
                <p>Reaching this page means you are authenticated</p>
                <p>Your token: {this.props.token}</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(Home);