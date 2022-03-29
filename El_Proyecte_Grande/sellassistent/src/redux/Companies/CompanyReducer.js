import { FETCH_COMPANIES_FAILURE, FETCH_COMPANIES_REQUEST, FETCH_COMPANIES_SUCCESS } from "./CompanyTypes"

const initialState = {
    loading: false,
    companies: [],
    error: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_COMPANIES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_COMPANIES_SUCCESS:
            return {                
                loading: false,
                companies: action.payload,
                error: ''
            }
        case FETCH_COMPANIES_FAILURE:
            return {
                loading: false,
                companies: [],
                error: action.payload
            }
        default: return state
    }
}

export default reducer