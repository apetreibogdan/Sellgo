import {
    FETCH_DEALS_FAILURE,
    FETCH_DEALS_REQUEST,
    FETCH_DEALS_SUCCESS,
    ADD_DEALS_FAILURE,
    ADD_DEALS_SUCCESS,
    ADD_DEALS_REQUEST,
} from "./DealTypes";

const initialState = {
    loading: false,
    products: [],
    error: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DEALS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_DEALS_SUCCESS:
            return {
                loading: true,
                deals: action.payload,
                error: "",
            };
        case FETCH_DEALS_FAILURE:
            return {
                loading: true,
                deals: [],
                error: action.payload,
            };
        case ADD_DEALS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADD_DEALS_SUCCESS:
            return {
                loading: true,
                deals: action.payload,
                error: "",
            };
        case ADD_DEALS_FAILURE:
            return {
                loading: true,
                deals: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
