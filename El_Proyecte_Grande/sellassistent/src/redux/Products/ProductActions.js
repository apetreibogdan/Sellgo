import { CreateAPIEndPoint, ENDPOINTS } from "../../api/Index";

import {
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
} from "./ProductTypes";

export const fetchProductsRequest = () => {
    return {
        type: FETCH_PRODUCTS_REQUEST,
    };
};
export const fetchProductsSuccess = (products) => {
    return {
        type: FETCH_PRODUCTS_SUCCESS,
        payload: products,
    };
};
export const fetchProductsFailure = (error) => {
    return {
        type: FETCH_PRODUCTS_FAILURE,
        payload: error,
    };
};

export const fetchProducts = () => {
    return (dispatch) => {
        dispatch(fetchProductsRequest);
        CreateAPIEndPoint(ENDPOINTS.PRODUCT)
            .fetchAll()
            .then((response) => {
                const products = response.data;
                dispatch(fetchProductsSuccess(products));
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchProductsFailure(errorMsg));
            });
    };
};
