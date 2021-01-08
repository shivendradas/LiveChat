import React, { Component } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { connect } from 'react-redux'
import RNSimData from 'react-native-sim-data';

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { updateMobileNumber, login, userRegister, setEmail, setPassword, setDOB, setConfirmPassword, clearLoginError } from '../../action/loginAction';
import { setDatepickerVisible } from "../../action/datePickerAction"
import { FORM_TYPE } from '../../constant/loginTypes';
import CustomDatePicker from '../datepicker/CustomDatePicker';
import styles from '../../styles/styles.js';

class Form extends Component {
    isDatepickerVisible = false;
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getMobileNumber();
    }
    UNSAFE_componentWillUpdate(nextProps, nextState) {
        console.log(nextProps)
        if (this.props.dob != nextProps.dob) {
            this.isDatepickerVisible = false;
        }

    }
    async getMobileNumber() {
        const detail = await RNSimData.getSimInfo();
        if (detail) {
            this.props.updateMobileNumber(detail.phoneNumber0);
        }
    }
    confirmPassword() {
        if (this.props.type == FORM_TYPE.Registration) {
            return <TextInput style={styles.inputBox}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="#ffffff"
                selectionColor="#fff"
                onChangeText={this.props.setConfirmPassword}
                ref={(input) => this.password = input}
            />
        } else {
            return;
        }
    }
    /**
     * showing date picker button based on condition
     */
    showDatePickerButton() {
        if (this.props.type == FORM_TYPE.Registration) {
            return <TouchableOpacity onPress={async () => { await this.showDatePick() }}>
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    value={this.props.dob + ""}
                    placeholder="date"
                    inlineImagePadding={4}
                    inlineImageLeft="calendar"
                    placeholderTextColor="#ffffff"
                    onFocus={async () => { await this.showDatePick() }}
                />
            </TouchableOpacity>

        } else {
            return;
        }
    }
    showDatePick() {
        this.isDatepickerVisible = true
        this.props.setDatepickerVisible(this.isDatepickerVisible);
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
            this.props.login(this.props.mobileNumber, this.props.registeredEmail, this.props.password, this.props.dob);
        }
    }
    showError() {
        if (this.props.loginError != "") {
            const errorMsg = this.props.loginError;
            console.error(errorMsg);
        }
    }
    async onSelectDate(dob) {
        if (dob.nativeEvent.timestamp) {
            dob = new Date(dob.nativeEvent.timestamp);
            await this.props.setDOB(dob);
        } else {
            this.isDatepickerVisible = false;
        }
        await this.props.setDatepickerVisible(this.isDatepickerVisible);
    }

    render() {
        return (
            <View style={styles.subContainer}>
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
                    selectionColor="#fff"
                    ref={(input) => this.password = input}
                    onChangeText={this.props.setPassword}
                />
                {this.confirmPassword()}
                {this.showDatePickerButton()}
                {this.isDatepickerVisible && (<CustomDatePicker onSelectDate={this.onSelectDate.bind(this)} selectedDate={this.props.dob} />)}
                <TouchableOpacity style={styles.button} onPress={async () => { await this.onSubmit() }}>
                    <Text style={styles.buttonText}>{this.props.type}</Text>
                </TouchableOpacity>
                {this.showError()}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mobileNumber: state.auth.mobileNumber,
        registeredEmail: state.auth.registeredEmail,
        password: state.auth.password,
        dob: state.auth.dob,
        confirmPassword: state.auth.confirmPassword,
        loginError: state.auth.loginError,
        isDatepickerVisible: state.datePicker.isDatepickerVisible
    }
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        updateMobileNumber: (mobileNumber) => {
            dispatch(updateMobileNumber(mobileNumber))
        },
        login: (mobileNumber, registeredEmail, password, dob) => {
            if (props.type == FORM_TYPE.Registration) {
                dispatch(userRegister({ mobileNumber, registeredEmail, password, dob }));
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
        },
        setDOB: (date) => {
            dispatch(setDOB(date))
        },
        clearLoginError: () => {
            dispatch(clearLoginError())
        },
        setDatepickerVisible: (isVisible) => {
            dispatch(setDatepickerVisible(isVisible))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)