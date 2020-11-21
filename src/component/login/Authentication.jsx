import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loginSuccess } from '../../action/loginAction';
import { LOGIN_SUCCESS } from '../../constant/loginTypes';
import MainTab from '../tab/MainTab';
import Login from './Login';
import LoginRegister from './LoginRegister';
class Authentication extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.checkAuthentication();
    }
    checkAuthentication() {
        const file  = require('../../res/register.json');
        if (file && (file.user && file.user != "")) {
            this.props.changeAuthenticationState(true, "Shiva");
        } else {
            this.props.changeAuthenticationState(false, null);
        }
    }
    render() {
        console.log("renderer=====");
        console.log(this.props);
        if (this.props.isAuthenticated) {
            return (
                <MainTab />
            )
        } else if (this.props.isLoginRegister) {
            return (
                <LoginRegister />
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
        isLoginRegister: state.auth.isLoginRegister,
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
export default connect(mapStateToProps, mapDispatchToProps)(Authentication);