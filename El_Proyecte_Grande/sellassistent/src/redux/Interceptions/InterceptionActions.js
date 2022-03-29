import { CreateAPIEndPoint, ENDPOINTS } from "../../api/Index";

import {
    FETCH_INTERCEPTIONS_FAILURE,
    FETCH_INTERCEPTIONS_REQUEST,
    FETCH_INTERCEPTIONS_SUCCESS,
} from "./InterceptionTypes";

export const fetchInterceptionsRequest = () => {
    return {
        type: FETCH_INTERCEPTIONS_REQUEST,
    };
};
export const fetchInterceptionsSuccess = (interceptions) => {
    return {
        type: FETCH_INTERCEPTIONS_SUCCESS,
        payload: interceptions,
    };
};
export const fetchInterceptionsFailure = (error) => {
    return {
        type: FETCH_INTERCEPTIONS_FAILURE,
        payload: error,
    };
};

export const fetchInterceptions = () => {
    return (dispatch) => {
        dispatch(fetchInterceptionsRequest);
        CreateAPIEndPoint(ENDPOINTS.INTERCEPTION)
            .fetchAll()
            .then((response) => {
                const interceptions = response.data;
                dispatch(fetchInterceptionsSuccess(interceptions));
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchInterceptionsFailure(errorMsg));
            });
    };
};
export const fetchInterceptionsWithClosestDate = () => {
    return (dispatch) => {
        dispatch(fetchInterceptionsRequest);
        CreateAPIEndPoint(ENDPOINTS.INTERCEPTION)
            .getInterceptionWithCloseDate()
            .then((response) => {
                const interceptions = response.data;
                dispatch(fetchInterceptionsSuccess(interceptions));
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchInterceptionsFailure(errorMsg));
            });
    };
};
