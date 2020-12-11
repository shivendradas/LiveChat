import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loginSuccess, setLoginLoadingIcon } from '../../action/loginAction';
import MainTab from '../tab/MainTab';
import Login from './Login';
import LoginLogo from './LoginLogo';
import LoginRegister from './LoginRegister';
var RNFS = require('react-native-fs');
class Authentication extends React.Component {
    constructor(props) {
        super(props);
        this.checkAuthentication();
    }
    
    async checkAuthentication() {
        //const file  = require('../../res/register.json');
        var path = RNFS.DocumentDirectoryPath + '/register.json';
        let file_content = null;
        try {
            if (await RNFS.exists(path)) {
                await RNFS.readFile(path, 'utf8')
                    .then((data) => {
                        file_content = data;
                        console.log("got data: ", data);
                    })
                    .catch((e) => {
                        console.error("got error: ", e);
                    })
            } else {
                console.log("File does not exist");
                this.props.changeLoadingIconState(false, false);
            }
        } catch (err) {
            console.log('ERROR:', err);
        }
        const file = JSON.parse(file_content);
        if (file && (file.user && file.user != "")) {
            this.props.changeAuthenticationState(true, false, file.user);
        } else {
            this.props.changeLoadingIconState(false, false);
        }
    }
    render() {
        if (this.props.isLoginLoadingIcon) {
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
        isLoginRegister: state.auth.isLoginRegister,
        isLoginLoadingIcon: state.auth.isLoginLoadingIcon
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        changeAuthenticationState: (isAuthenticated, isLoginLoadingIcon, userName) => {
            dispatch(loginSuccess({ isAuthenticated: isAuthenticated, isLoginLoadingIcon: isLoginLoadingIcon, userName: userName }))
        },
        changeLoadingIconState: (isAuthenticated, isLoginLoadingIcon) => {
            dispatch(setLoginLoadingIcon({ isAuthenticated: isAuthenticated, isLoginLoadingIcon: isLoginLoadingIcon }))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Authentication);