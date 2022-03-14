import { CreateAPIEndPoint, ENDPOINTS } from "../../api/Index";

import {
    FETCH_CLIENTS_FAILURE,
    FETCH_CLIENTS_REQUEST,
    FETCH_CLIENTS_SUCCESS,
} from "./ClientTypes";

export const fetchClientsRequest = () => {
    return {
        type: FETCH_CLIENTS_REQUEST,
    };
};
export const fetchClientsSuccess = (clients) => {
    return {
        type: FETCH_CLIENTS_SUCCESS,
        payload: clients,
    };
};
export const fetchClientsFailure = (error) => {
    return {
        type: FETCH_CLIENTS_FAILURE,
        payload: error,
    };
};

export const fetchClients = () => {
    return (dispatch) => {
        dispatch(fetchClientsRequest);
        CreateAPIEndPoint(ENDPOINTS.CLIENT)
            .fetchAll()
            .then((response) => {
                const clients = response.data;
                dispatch(fetchClientsSuccess(clients));
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchClientsFailure(errorMsg));
            });
    };
};
