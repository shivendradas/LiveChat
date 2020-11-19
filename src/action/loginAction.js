import {LOGIN_INITIALIZE, LOGIN_REGISTER, LOGIN_SUCCESS} from '../constant/loginTypes'
export const initializeApp = () => {
    return {
        type: LOGIN_INITIALIZE
     }
}

export const loginSuccess = (loginDetail) => {
    console.log(loginDetail);
    return {
        type: LOGIN_SUCCESS,
        loginDetail
     }
}

export const loginRegister = (loginDetail) => {
    return {
        type: LOGIN_REGISTER,
        loginDetail
     }
}
