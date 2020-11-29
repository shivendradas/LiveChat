import React, { Component } from 'react';
import { connect } from 'react-redux'
import RNSimData from 'react-native-sim-data'

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    PermissionsAndroid
} from 'react-native';
import { updateMobileNumber, login, userRegister, setEmail, setPassword, setConfirmPassword } from '../../action/loginAction';
import { FORM_TYPE } from '../../constant/loginTypes';

class Form extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.getMobileNumber();
    }

    async getMobileNumber() {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE)
        if (granted == PermissionsAndroid.RESULTS.GRANTED) {
            const detail = RNSimData.getSimInfo();
            if (detail) {
                this.props.updateMobileNumber(detail.phoneNumber0);
            }
        }

    }
    confirmPassword() {
        if (this.props.type == FORM_TYPE.Registration) {
            return <TextInput style={styles.inputBox}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="#ffffff"
                onChangeText={this.props.setConfirmPassword}
                ref={(input) => this.password = input}
            />
        } else {
            return;
        }
    }

    /**
     * Before submit form, check all entries is valid or not
     */
    isValidation() {
        const mobileNumber = this.props.mobileNumber;
        if (mobileNumber == undefined || this.props.mobileNumber.length < 12) {
            return false;
        } else if (this.props.registeredEmail == "") {
            console.error("email is empty.");
            return false;
        } else if (this.props.registeredEmail != "" && !this.validateEmail(this.props.registeredEmail)) {
            console.error("Email is not valid..")
            return false;
        } else if (this.props.password == "" || (this.props.type == FORM_TYPE.Registration && this.props.confirmPassword == "")) {
            console.error("password is empty..");
            return false;
        } else if (this.props.password != "" && (this.props.type == FORM_TYPE.Registration && this.props.confirmPassword == "")) {
            console.error("confirm password is empty..");
            return false;
        }
        else if (this.props.type == FORM_TYPE.Registration && this.props.password != this.props.confirmPassword) {
            console.log(this.props.password + "==" + this.props.confirmPassword)
            console.error("password is not same");
            return false;
        }
        return true;
    }

    /**
     * check wheather email is valid or not
     * @param {*} email 
     */
    validateEmail(email) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === false) {
            console.log("Email is Not Correct");
            return false;
        }
        else {
            return true;
        }
    }

    onSubmit() {
        if (this.isValidation()) {
            this.props.login(this.props.mobileNumber, this.props.registeredEmail, this.props.password);
        }
    }
    showError() {
        if (this.props.response !="") {
            console.error(this.props.response.error)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputBox} editable={false}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    value={this.props.mobileNumber + ""}
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                />
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Email"
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    onSubmitEditing={() => this.password.focus()}
                    onChangeText={this.props.setEmail}
                />
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor="#ffffff"
                    ref={(input) => this.password = input}
                    onChangeText={this.props.setPassword}
                />
                {this.confirmPassword()}
                <TouchableOpacity style={styles.button} onPress={async () => { await this.onSubmit() }}>
                    <Text style={styles.buttonText}>{this.props.type}</Text>
                </TouchableOpacity>
                {this.showError()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    inputBox: {
        width: 300,
        backgroundColor: 'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});
const mapStateToProps = (state) => {
    return {
        mobileNumber: state.auth.mobileNumber,
        registeredEmail: state.auth.registeredEmail,
        password: state.auth.password,
        confirmPassword: state.auth.confirmPassword,
        response: state.auth.response
    }
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        updateMobileNumber: (mobileNumber) => {
            dispatch(updateMobileNumber(mobileNumber))
        },
        login: (mobileNumber, registeredEmail, password) => {
            if (props.type == FORM_TYPE.Registration) {
                dispatch(userRegister({ mobileNumber, registeredEmail, password }));
            } else {
                dispatch(login({ mobileNumber, registeredEmail, password }));
            }
        },
        setEmail: (registeredEmail) => {
            dispatch(setEmail(registeredEmail))
        },
        setPassword: (password) => {
            dispatch(setPassword(password))
        },
        setConfirmPassword: (password) => {
            dispatch(setConfirmPassword(password))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)