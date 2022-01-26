import axios from "axios";
import {
    CREATE_CLIENTINFOPROFESSIONAL_SUCCESS,
    UPDATE_CLIENTINFOPROFESSIONAL_SUCCESS,
    DELETE_CLIENTINFOPROFESSIONAL_SUCCESS,
    FETCH_CLIENTINFOPROFESSIONAL_SUCCESS,
} from "./ClientInfoProfessionalTypes";

const authState = {
    isLoggedIn: false,
    infoprofessional: {
        id: "",
        title: "",
        cares: [],
        details: "",
    },
};
