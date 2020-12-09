import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';
import LoginLogo from './LoginLogo';
import Form from './Form';
import { loginRegister, loginSuccess } from '../../action/loginAction';
import { FORM_TYPE } from '../../constant/loginTypes';
var RNFS = require('react-native-fs');

class Login extends React.Component {
    constructor(props) {
        super(props)
    }
    static defaultProps = {
        formType: FORM_TYPE.Login
    }
    componentDidMount() {
        if (this.props.isLoginSuccess) {
            this.saveUserDetail();
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.isLoginSuccess) {
            this.saveUserDetail(nextProps);
            return false;
        }
        return true;
    }
    async saveUserDetail(nextProps) {
        console.log("save user detail====");
        if (nextProps) {
            const user = nextProps.saveUserInfo.registeredEmail.split("@")[0];

            // create a path you want to write to
            // :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
            // but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
            console.log("path====")
            console.log(RNFS.DocumentDirectoryPath)
            var path = RNFS.DocumentDirectoryPath + '/register.json';
            //const path  = require('../../res/register.json');
            var content = {
                "user": user,
                "registeredNumber": nextProps.saveUserInfo.mobileNumber,
                "registeredEmail": nextProps.saveUserInfo.registeredEail
            }
            // write the file
            RNFS.writeFile(path, JSON.stringify(content), 'utf8')
                .then((success) => {
                    console.log('File has been saved.');
                    this.props.loginSuccess();
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    }
    render() {
        return (

            <View style={styles.container}>
                <LoginLogo />
                <Form type={this.props.formType} />
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Dont have an account yet?</Text>
                    <TouchableOpacity onPress={async () => { await this.props.changeToRegistrationState(FORM_TYPE.Registration) }}><Text style={styles.signupButton}> Register</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#455a64',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    signupTextCont: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row'
    },
    signupText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 16
    },
    signupButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500'
    }
});

const mapStateToProps = (state) => {
    return {
        saveUserInfo: state.auth.saveUserInfo,
        isLoginSuccess: state.auth.isLoginSuccess
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeToRegistrationState: (formType) => {
            dispatch(loginRegister({ formType: formType, isAuthenticated: false, isLoginRegister: true }))
        },
        loginSuccess: (formType) => {
            dispatch(loginSuccess({ isAuthenticated: true }))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)