import { LOGIN, LOGIN_INITIALIZE, LOGIN_REGISTER, LOGIN_SUCCESS, SET_EMAIL, SET_PASSWORD, SET_CONFIRM_PASSWORD, UPDATE_MOBILE_NUMBER } from '../constant/loginTypes'
import { LOGIN_URL } from '../constant/serviceUrls';
/*export const initializeApp = () => {
    return {
        type: LOGIN_INITIALIZE
    }
}*/
export const setUserDetail = (response) => {
    return {
        type: LOGIN,
        response
    }
}
export const login = (userDetail) => {
    console.log(userDetail);
    return async (dispatch) => {
        try {
            const userData = await fetch(LOGIN_URL, {
                method: 'GET'
            });
            console.log(userData);
            await dispatch(setUserDetail(userData));
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
            const userData = await fetch(LOGIN_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(userDetail)
            });
            console.log(userData);
            await dispatch(setUserDetail(userData));
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
