import { LOGIN_INITIALIZE, LOGIN_REGISTER, LOGIN_SUCCESS, LOGIN } from '../constant/loginTypes'
const initialState = {
    isAuthenticated: false,
    isLoginRegister: false,
    isLogin: false,
    userName: null
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
           //return { ...state, isLoginRegister: false, isAuthenticated: action.loginDetail.isAuthenticated, isLogin: false };
            return Object.assign({}, state, {
                isAuthenticated: action.loginDetail.isAuthenticated,
                userName:  action.loginDetail.userName,
            });

        case LOGIN_REGISTER:
            return { ...state, isLoginRegister: true, isAuthenticated: false, isLogin: false };

        case LOGIN:
            return { ...state, isLoginRegister: false, isAuthenticated: false, isLogin: true };

        default:
            return state;
    }
};

export default loginReducer;