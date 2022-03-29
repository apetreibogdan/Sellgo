import axios from "axios";
import {
    CREATE_CLIENTCARES_SUCCESS,
    UPDATE_CLIENTCARES_SUCCESS,
    FETCH_CLIENTCARES_SUCCESS,
} from "./ClientCaresTypes";

const authState = {
    isLoggedIn: false,
    infoprofessional: {
        id: "",
        firstName: "",
        lastName: "",
        gender: "",
        details: "",
        dateOfBirth: "",
        dateOfInterest: [],
    },
};
