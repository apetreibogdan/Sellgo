import {
    FETCH_CLIENTS_FAILURE,
    FETCH_CLIENTS_REQUEST,
    FETCH_CLIENTS_SUCCESS,
} from "./ClientTypes";

const initialState = {
    loading: false,
    clients: [],
    error: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CLIENTS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_CLIENTS_SUCCESS:
            return {
                loading: true,
                clients: action.payload,
                error: "",
            };
        case FETCH_CLIENTS_FAILURE:
            return {
                loading: true,
                clients: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
