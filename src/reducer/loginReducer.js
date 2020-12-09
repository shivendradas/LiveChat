import { SAVE_USER_INFO, LOGIN_REGISTER, LOGIN_SUCCESS, LOGIN, FORM_TYPE, UPDATE_MOBILE_NUMBER, SET_PASSWORD, SET_EMAIL, SET_DOB, SET_CONFIRM_PASSWORD, LOGIN_ERROR, CLEAR_LOGIN_ERROR } from '../constant/loginTypes'
const initialState = {
    isAuthenticated: false,
    isLoginRegister: false,
    isLoginSuccess: false,
    formType: FORM_TYPE.Login,
    userName: null,
    registeredEmail: "",
    password: "",
    confirmPassword: "",
    mobileNumber: 0,
    loginError:"",
    saveUserInfo: {},
    dob: new Date(),
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticated: action.loginDetail.isAuthenticated,
                userName: action.loginDetail.userName,
            });

        case LOGIN_REGISTER:
            return Object.assign({}, state, {
                isAuthenticated: action.loginDetail.isAuthenticated,
                isLoginRegister: action.loginDetail.isLoginRegister
            });

        case UPDATE_MOBILE_NUMBER:
            return Object.assign({}, state, {
                mobileNumber: action.mobileNumber
            });
        case SAVE_USER_INFO:
            return Object.assign({}, state, {
                saveUserInfo: action.response.userDetail,
                isLoginSuccess: action.response.isLoginSuccess
            });
        case SET_EMAIL:
            return Object.assign({}, state, {
                registeredEmail: action.registeredEmail
            });
        case SET_DOB:
            console.log("dob===xx");
            console.log(action)
            return Object.assign({}, state, {
                dob: action.dob
            });
        case SET_PASSWORD:            
            return Object.assign({}, state,
            {
                password: action.password
            });
        case SET_CONFIRM_PASSWORD:
            return Object.assign({}, state,
            {
                confirmPassword: action.password
            });
        case LOGIN_ERROR:
            return Object.assign({}, state,
            {
                loginError: action.response
            });
        case CLEAR_LOGIN_ERROR:
            return Object.assign({}, state,
            {
                loginError: ""
            });

        default:
            return state;
    }
};

export default loginReducer;
