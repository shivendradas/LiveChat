import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity } from 'react-native';
import LoginLogo from './LoginLogo';
import Form from './Form';
import { loginRegister } from '../../action/loginAction';
import { FORM_TYPE } from '../../constant/loginTypes';
import styles from '../../styles/styles.js';

class LoginRegister extends Component {
    constructor(props) {
        super(props)
    }
    static defaultProps = {
        formType: FORM_TYPE.Registration
    }

    render() {
        return (

            <View style={styles.container}>
                <LoginLogo />
                <Form type={this.props.formType} />
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Already have an account?</Text>
                    <TouchableOpacity onPress={async () => { await this.props.changeToLoginState(FORM_TYPE.Login) }}><Text style={styles.signupButton}> Login</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeToLoginState: (formType) => {
            dispatch(loginRegister({ formType: formType, isAuthenticated: false, isLoginRegister: false }))
        }
    }
}
export default connect(null, mapDispatchToProps)(LoginRegister)