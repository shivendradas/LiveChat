import React, { Component } from 'react';
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

class LoginRegister extends Component {

    render() {
        return (

            <View style={styles.container}>
                <LoginLogo />
                <Form type="Register" />
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Already have an account?</Text>
                    <TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}> Login</Text></TouchableOpacity>
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
export default LoginRegister