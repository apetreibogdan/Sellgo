import axios from "axios";
import {
    CREATE_CLIENTPERSONALAPPROACH_SUCCESS,
    CREATE_CLIENTPERSONALAPPROACH_REQUEST,
    CREATE_CLIENTPERSONALAPPROACH_FAILURE,
    UPDATE_CLIENTPERSONALAPPROACH_SUCCESS,
    UPDATE_CLIENTPERSONALAPPROACH_REQUEST,
    UPDATE_CLIENTPERSONALAPPROACH_FAILURE,
    DELETE_CLIENTPERSONALAPPROACH_SUCCESS,
    DELETE_CLIENTPERSONALAPPROACH_REQUEST,
    DELETE_CLIENTPERSONALAPPROACH_FAILURE,
    FETCH_CLIENTPERSONALAPPROACH_SUCCESS,
    FETCH_CLIENTPERSONALAPPROACH_REQUEST,
    FETCH_CLIENTPERSONALAPPROACH_FAILURE,
} from "./ClientPersonalApproachTypes";

const initialState = {
    id: "",
    details: "",
    clientId: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CLIENTPERSONALAPPROACH_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_CLIENTPERSONALAPPROACH_SUCCESS:
            return {
                loading: true,
                personalapproach: action.payload,
                error: "",
            };
        case FETCH_CLIENTPERSONALAPPROACH_FAILURE:
            return {
                loading: true,
                personalapproach: [],
                error: action.payload,
            };
        // case CREATE_CLIENTPERSONALAPPROACH_SUCCESS:
        //     return [...state, payload];

        // case UPDATE_CLIENTPERSONALAPPROACH_SUCCESS:
        //     return [...state, payload];

        // case DELETE_CLIENTPERSONALAPPROACH_SUCCESS:
        //     return [...state, payload];

        default:
            return state;
    }
};

export default reducer;
