import { CreateAPIEndPoint, ENDPOINTS } from "../../api/Index";

import {
    FETCH_DEALS_FAILURE,
    FETCH_DEALS_REQUEST,
    FETCH_DEALS_SUCCESS,
    ADD_DEALS_FAILURE,
    ADD_DEALS_REQUEST,
    ADD_DEALS_SUCCESS,
} from "./DealTypes";

export const fetchDealsRequest = () => {
    return {
        type: FETCH_DEALS_REQUEST,
    };
};
export const fetchDealsSuccess = (deals) => {
    return {
        type: FETCH_DEALS_SUCCESS,
        payload: deals,
    };
};
export const fetchDealsFailure = (error) => {
    return {
        type: FETCH_DEALS_FAILURE,
        payload: error,
    };
};

export const fetchDeals = (id) => {
    return (dispatch) => {
        dispatch(fetchDealsRequest);
        CreateAPIEndPoint(ENDPOINTS.DEAL)
            .getDealsPerUser(id)
            .then((response) => {
                const deals = response.data;
                dispatch(fetchDealsSuccess(deals));
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchDealsFailure(errorMsg));
            });
    };
};

export const addDealRequest = () => {
    return {
        type: ADD_DEALS_REQUEST,
    };
};
export const addDealSuccess = (deals) => {
    return {
        type: ADD_DEALS_SUCCESS,
        payload: deals,
    };
};
export const addDealFailure = (error) => {
    return {
        type: ADD_DEALS_FAILURE,
        payload: error,
    };
};

export const addDeal = (deal) => {
    return () => {
        console.log("am ajuns aici");
        CreateAPIEndPoint(ENDPOINTS.DEAL).create(deal);
    };
};
