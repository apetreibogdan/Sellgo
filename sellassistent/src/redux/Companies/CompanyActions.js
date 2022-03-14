import { CreateAPIEndPoint, ENDPOINTS } from '../../api/Index'

import { FETCH_COMPANIES_FAILURE, FETCH_COMPANIES_REQUEST, FETCH_COMPANIES_SUCCESS } from "./CompanyTypes"

export const fetchCompaniesRequest = () => {
    return{
        type: FETCH_COMPANIES_REQUEST
    }
}
export const fetchCompaniesSuccess = (companies) => {
    return{
        type: FETCH_COMPANIES_SUCCESS,
        payload: companies
    }
}
export const fetchCompaniesFailure = (error) => {
    return{
        type: FETCH_COMPANIES_FAILURE,
        payload: error
    }
}

export const fetchCompanies = () => {
   
    return (dispatch) => {
        dispatch(fetchCompaniesRequest)
        CreateAPIEndPoint(ENDPOINTS.COMPANY).fetchAll()
        .then(response => {
            const companies = response.data;
            dispatch(fetchCompaniesSuccess(companies))
        })
        .catch(error => {
            const errorMsg = error.message; 
            dispatch(fetchCompaniesFailure(errorMsg))
        })
    }
}

