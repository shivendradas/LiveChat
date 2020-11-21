import { LOGIN_INITIALIZE, LOGIN_REGISTER, LOGIN_SUCCESS, UPDATE_MOBILE_NUMBER } from '../constant/loginTypes'
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

export const updateMobileNumber = (mobileNumber) => {
    return {
        type: UPDATE_MOBILE_NUMBER,
        mobileNumber
    }
}
