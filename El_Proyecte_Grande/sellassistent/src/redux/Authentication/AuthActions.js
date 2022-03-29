import { CreateAPIEndPoint, ENDPOINTS } from "../../api/Index";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
} from "./AuthTypes";

export const fetchRegisterRequest = () => {
    return {
        type: REGISTER_REQUEST,
    };
};
export const fetchRegisterSuccess = (data) => {
    return {
        type: REGISTER_SUCCESS,
        payload: data,
    };
};
export const fetchRegisterFailure = (error) => {
    return {
        type: REGISTER_FAILED,
        payload: error,
    };
};

const RegisterAuthAction = (userState, history, setErrorHandler) => {
    return async (dispatch) => {
        try {
            dispatch(fetchRegisterRequest);
            const res = await CreateAPIEndPoint(ENDPOINTS.REGISTER).create(
                userState
            );
            const { data } = res;
            dispatch(fetchRegisterSuccess(data));
            history.push("/");
        } catch (error) {
            if (error.response) {
                dispatch(fetchRegisterFailure(error));
                setErrorHandler({
                    hasError: true,
                    message: error.response.data.message,
                });
            }
        }
    };
};

export const fetchLoginRequest = () => {
    return {
        type: LOGIN_REQUEST,
    };
};
export const fetchLoginSuccess = (data) => {
    return {
        type: LOGIN_SUCCESS,
        payload: data,
    };
};
export const fetchLoginFailure = (error) => {
    return {
        type: LOGIN_FAILED,
        payload: error,
    };
};

const LoginAuthAction = (loginState, history, setErrorHandler) => {
    return async (dispatch) => {
        try {
            dispatch(fetchLoginRequest);
            const res = await CreateAPIEndPoint(ENDPOINTS.LOGIN).create(
                loginState,
                { withCredentials: true }
            );
            const { data } = res;
            dispatch(fetchLoginSuccess(data));
            history.push("/");
        } catch (error) {
            if (error.response) {
                dispatch(fetchLoginFailure(error));
            }
            await setErrorHandler({ hasError: true, message: error.response });
        }
    };
};

//For credetials backend
// const LoginAuthAction = (loginState, history, setErrorHandler) => {
//   return async (dispatch) => {
//     try {
//       dispatch(fetchLoginRequest);
//       const res = await fetch("https://localhost:44349/api/account/login", {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         credentials: 'include',
//         body: JSON.stringify(loginState)
//       });
//       const { data } = res;
//       dispatch(fetchLoginSuccess(data));
//       history.push("/");
//     } catch (error) {
//       if (error.response) {
//           dispatch(fetchLoginFailure(error));
//       }
//       await setErrorHandler({ hasError: true, message: error.response });
//     }
//   };
// };

export const fetchLogoutRequest = () => {
    return {
        type: LOGOUT_REQUEST,
    };
};
export const fetchLogoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS,
        payload: "",
    };
};
export const fetchLogoutFailure = (error) => {
    return {
        type: LOGOUT_FAILED,
        payload: error,
    };
};

const LogOutAuthAction = (history) => {
    return async (dispatch) => {
        try {
            dispatch(fetchLogoutRequest);
            // const res = await CreateAPIEndPoint(ENDPOINTS.LOGOUT).fetchAll();
            // const { data } = res;
            dispatch(fetchLogoutSuccess());
            history.push("/");
        } catch (error) {
            if (error.response) {
                dispatch(fetchLogoutFailure(error));
            }
        }
    };
};

export { RegisterAuthAction, LogOutAuthAction, LoginAuthAction };
