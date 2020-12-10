import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loginSuccess } from '../../action/loginAction';
import MainTab from '../tab/MainTab';
import Login from './Login';
import LoginLogo from './LoginLogo';
import LoginRegister from './LoginRegister';
var RNFS = require('react-native-fs');
class Authentication extends React.Component {
    showLoading = true;
    constructor(props) {
        super(props);
        this.checkAuthentication();
    }
    async checkAuthentication() {
        //const file  = require('../../res/register.json');
        var path = RNFS.DocumentDirectoryPath + '/register.json';
        let file_content = null;
        try {
            await RNFS.readFile(path, 'utf8')
                .then((data) => {
                    file_content = data;
                    console.log("got data: ", data);
                })
                .catch((e) => {
                    console.error("got error: ", e);
                })
        } catch (err) {
            console.log('ERROR:', err);
        }
        this.showLoading = false;
        const file = JSON.parse(file_content);
        if (file && (file.user && file.user != "")) {
            this.props.changeAuthenticationState(true, file.user);
        } else {
            this.props.changeAuthenticationState(false, null);
        }
    }
    render() {
        if (this.showLoading) {
            return <LoginLogo />
        } else if (this.props.isAuthenticated) {
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
        isLoginRegister: state.auth.isLoginRegister
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