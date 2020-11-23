import { LOGIN_INITIALIZE, LOGIN_REGISTER, LOGIN_SUCCESS, LOGIN, FORM_TYPE, UPDATE_MOBILE_NUMBER, SET_PASSWORD, SET_EMAIL } from '../constant/loginTypes'
const initialState = {
    isAuthenticated: false,
    isLoginRegister: false,
    isLogin: false,
    formType: FORM_TYPE.Login,
    userName: null,
    registeredEmail: "",
    password: "",
    mobileNumber: 0,
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            //return { ...state, isLoginRegister: false, isAuthenticated: action.loginDetail.isAuthenticated, isLogin: false };
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
        case LOGIN:
            return Object.assign({}, state, action.userDetail);
        case SET_EMAIL:
            return Object.assign({}, state, {
                registeredEmail: action.registeredEmail
            });
        case SET_PASSWORD:
            console.log("pass===");
            console.log(action)
            return Object.assign({}, state,
                {
                    password: action.password
                });

        default:
            return state;
    }
};

export default loginReducer;
