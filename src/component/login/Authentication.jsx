import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loginSuccess } from '../../action/loginAction';
import { LOGIN_SUCCESS } from '../../constant/loginTypes';
import MainTab from '../tab/MainTab';
import Login from './Login';
class Authentication extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.checkAuthentication();
    }
    checkAuthentication() {
        if (true) {
            this.props.changeAuthenticationState(true, "Shiva");
        }
    }
    render() {
        console.log("renderer=====");
        console.log(this.props);
        if (this.props.isAuthenticated) {
            return (
                <MainTab />
            )
        } else {
            return (
                <Login />
            )
        }

    }
}
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        userName: state.auth.userName
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        changeAuthenticationState: (isAuthenticated, userName) => {
            dispatch(loginSuccess({ isAuthenticated: isAuthenticated, userName: userName }))
        }
    }
}
function mapDispatchToProps1(dispatch) {
    return {
        changeAuthenticationState: (isAuthenticated, userName) => dispatch(loginSuccess({ isAuthenticated: isAuthenticated, userName: userName }))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Authentication);