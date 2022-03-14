import {
    FETCH_INTERCEPTIONS_FAILURE,
    FETCH_INTERCEPTIONS_REQUEST,
    FETCH_INTERCEPTIONS_SUCCESS,
} from "./InterceptionTypes";

const initialState = {
    loading: false,
    interceptions: [],
    error: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_INTERCEPTIONS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_INTERCEPTIONS_SUCCESS:
            return {
                loading: true,
                interceptions: action.payload,
                error: "",
            };
        case FETCH_INTERCEPTIONS_FAILURE:
            return {
                loading: true,
                interceptions: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
