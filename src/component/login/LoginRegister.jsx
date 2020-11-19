import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ScrollView,
    Text,
    StyleSheet,
    TextInput,
    View,
    TouchableOpacity
} from 'react-native';
import LoginLogo from './LoginLogo';
import Form from './Form';
import { loginRegister } from '../../action/loginAction';
import { FORM_TYPE } from '../../constant/loginTypes';

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
const mapDispatchToProps = (dispatch) => {
    return {
        changeToLoginState: (formType) => {
            dispatch(loginRegister({ formType: formType, isAuthenticated: false, isLoginRegister: false }))
        }
    }
}
export default connect(null, mapDispatchToProps)(LoginRegister)