import {
    LOGIN, SAVE_USER_INFO, LOGIN_REGISTER, LOGIN_SUCCESS, SET_EMAIL, SET_PASSWORD, SET_CONFIRM_PASSWORD,
    UPDATE_MOBILE_NUMBER, LOGIN_ERROR, FORM_TYPE, CLEAR_LOGIN_ERROR, SET_DOB, LOGIN_LOADING_ICON
} from '../constant/loginTypes'
import { LOGIN_URL, LOGIN_REGISER_URL } from '../constant/serviceUrls';
import loginReducer from '../reducer/loginReducer';
/*export const initializeApp = () => {
    return {
        type: LOGIN_INITIALIZE
    }
}*/
export const setUserDetail = (response) => {
    return {
        type: SAVE_USER_INFO,
        response
    }
}
export const registerResponse = (response) => {
    return {
        type: LOGIN_ERROR,
        response
    }
}
export const login = (userDetail) => {
    console.log(userDetail);
    return async (dispatch) => {
        try {
            const userData = await fetch(LOGIN_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(userDetail)
            });
            const jsonResonse = await userData.json();
            if (jsonResonse.error) {
                await dispatch(registerResponse(jsonResonse));
            } else {
                dispatch(clearLoginError());
                dispatch(setUserDetail({ userDetail, isLoginSuccess: true }));
            }
            return userData || [];
        } catch (error) {
            console.error(error);
        }
    }
}
export const userRegister = (userDetail) => {
    console.log(userDetail);
    return async (dispatch) => {
        try {
            const userData = await fetch(LOGIN_REGISER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(userDetail)
            });
            const jsonResonse = await userData.json();
            if (jsonResonse.error) {
                await dispatch(registerResponse(jsonResonse));
            } else {
                dispatch(clearLoginError());
                dispatch(loginRegister({ formType: FORM_TYPE.Login, isAuthenticated: false, isLoginRegister: false }));
            }

            return userData || [];
        } catch (error) {
            console.error(error);
        }
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

export const setEmail = (email) => {
    console.log("mkkkl====")
    console.log(email)
    return {
        type: SET_EMAIL,
        registeredEmail: email
    }
}

export const setDOB = (dob) => {
    console.log("dob====")
    console.log(dob)
    return {
        type: SET_DOB,
        dob
    }
}

export const setPassword = (password) => {
    return {
        type: SET_PASSWORD,
        password
    }
}

export const setConfirmPassword = (password) => {
    return {
        type: SET_CONFIRM_PASSWORD,
        password
    }
}
export const clearLoginError = () => {
    return {
        type: CLEAR_LOGIN_ERROR
    }
}

export const setLoginLoadingIcon = (isLoaded) => {
    return {
        type: LOGIN_LOADING_ICON,
        isLoaded
    }
}
