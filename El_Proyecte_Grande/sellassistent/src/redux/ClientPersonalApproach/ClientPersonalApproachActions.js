import { CreateAPIEndPoint, ENDPOINTS } from "../../api/Index";

import {
    FETCH_CLIENTPERSONALAPPROACH_FAILURE,
    FETCH_CLIENTPERSONALAPPROACH_REQUEST,
    FETCH_CLIENTPERSONALAPPROACH_SUCCESS,
} from "./ClientPersonalApproachTypes";

export const fetchClientsRequest = () => {
    return {
        type: FETCH_CLIENTPERSONALAPPROACH_REQUEST,
    };
};
export const fetchClientsSuccess = (personalapproach) => {
    return {
        type: FETCH_CLIENTPERSONALAPPROACH_SUCCESS,
        payload: personalapproach,
    };
};
export const fetchClientsFailure = (error) => {
    return {
        type: FETCH_CLIENTPERSONALAPPROACH_FAILURE,
        payload: error,
    };
};

export const fetchPersonalApproach = (clientid) => {
    return (dispatch) => {
        dispatch(fetchClientsRequest);
        CreateAPIEndPoint(ENDPOINTS.PERSONALAPPROACH)
            .fetchById(clientid)
            .then((response) => {
                const deals = response.data;
                dispatch(fetchClientsSuccess(deals));
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchClientsFailure(errorMsg));
            });
    };
};
//create
// export const createPersonalApproach = (
//     clientid,
//     id,
//     userState,
//     history,
//     setErrorHandler
// ) => {
//     return (dispatch) => {
//         dispatch(fetchDealsRequest);
//         CreateAPIEndPoint(ENDPOINTS.DEAL)
//             .create(userState)
//             .getIndividualPersonalApproachPerClient(clientid, id)
//             .then((response) => {
//                 const deals = response.data;
//                 dispatch(fetchDealsSuccess(deals));
//             })
//             .catch((error) => {
//                 const errorMsg = error.message;
//                 dispatch(fetchDealsFailure(errorMsg));
//             });
//     };
// };

// const RegisterAuthAction = (userState, history, setErrorHandler) => {
//     return async (dispatch) => {
//       try {
//         dispatch(fetchRegisterRequest)
//         const res = await CreateAPIEndPoint(ENDPOINTS.REGISTER).create(userState);
//         const { data } = res;
//         dispatch(fetchRegisterSuccess(data));
//         history.push("/");
//       } catch (error) {
//         if (error.response) {
//             dispatch(fetchRegisterFailure(error));
//           setErrorHandler({
//             hasError: true,
//             message: error.response.data.message,
//           });
//         }
//       }
//     };
//   };
