import axios from "axios";
import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
} from "./AuthTypes";

const authState = {
    isLoggedIn: false,
    err: "",
    user: {
        id: "",
        name: "",
        expires_at: "",
        jwttoken: "",
        team: "",
        teamManager: "",
        role: "",
    },
};
const getAuthState = () => {
    const auth = localStorage.getItem("auth");
    try {
        const authobj = JSON.parse(auth);
        const { expires_at, jwttoken } = authobj.user;

        if (new Date(authobj.user.expire_at) > new Date()) {
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${jwttoken}`;
            return authobj;
        }
        return authState;
    } catch (error) {
        return authState;
    }
};
const newAuth = getAuthState();

const authreducer = (state = newAuth, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            const newAuthState = {
                isLoggedIn: true,
                user: action.payload,
            };
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${action.payload.jwttoken}`;
            localStorage.setItem("auth", JSON.stringify(newAuthState));
            return newAuthState;

        case LOGOUT_SUCCESS:
            localStorage.removeItem("auth");
            return authState;

        case LOGIN_SUCCESS:
            const loginAuthState = {
                isLoggedIn: true,
                user: action.payload,
            };
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${action.payload.jwttoken}`;
            localStorage.setItem("auth", JSON.stringify(loginAuthState));
            return loginAuthState;
        case LOGIN_FAILED:
            const errAuthState = {
                isLoggedIn: false,
                user: {
                    id: "",
                    name: "",
                    expires_at: "",
                    jwttoken: "",
                    team: "",
                    teamManager: "",
                    role: "",
                },
                msg: action.payload,
            };

            return errAuthState;

        default:
            return state;
    }
};

export default authreducer;
