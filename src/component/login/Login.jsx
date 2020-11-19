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
import { loginRegister } from '../../action/loginAction';
import { FORM_TYPE } from '../../constant/loginTypes';

class Login extends React.Component {
    constructor(props) {
        super(props)
    }
    static defaultProps = {
        formType: FORM_TYPE.Login
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
        isAuthenticated: state.auth.isAuthenticated,
        isLoginRegister: state.auth.isLoginRegister,
        formType: state.auth.formType
    }
};

const mapDispatchToProps = (dispatch) =>{
    return {
        changeToRegistrationState: (formType) => {
            dispatch(loginRegister({ formType: formType, isAuthenticated: false, isLoginRegister: true}))
        }
    }
}
export default connect(null, mapDispatchToProps)(Login)