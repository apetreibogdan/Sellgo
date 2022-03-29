import axios from "axios";
import { useState, useEffect } from "react";

const BASE_URL = "https://localhost:44349/api/";

export const ENDPOINTS = {
    BASE_URL: "https://localhost:44349/api/",
    REGISTER: "account/register",
    LOGIN: "account/login",
    LOGOUT: "account/logout",
    CLIENT: "client/",
    USER: "user/",
    DEAL: "deal/",
    PRODUCT: "product/",
    COMPANY: "Company/",
    INTERCEPTION: "Interception/",
    PERSONALAPPROACH: "PersonalApproach/",
    PROFESSIONALAPPROACH: "ProfessionalApproach/",
};

export const CreateAPIEndPoint = (endpoint) => {
    let url = BASE_URL + endpoint;

    return {
        fetchAll: () => axios.get(url),
        fetchById: (id) => axios.get(url + id),
        create: (newRecord) => axios.post(url, newRecord),
        update: (id, updateRecord) => axios.put(url + id, updateRecord),
        delete: (id) => axios.delete(url + id),
        getDealsPerUser: (id) => axios.get(url + "dealsforuser/" + id),
        getInterceptionWithCloseDate: () => axios.get(url + "closedate"),
        getPersonalApproachPerClient: (clientid) => axios.get(url + clientid),
    };
};

// const fetchDeals = async (user) => {
//     const res = await fetch(`${ENDPOINTS.BASE_URL}${ENDPOINTS.DEAL}dealsforuser/${user.user.id}`);
//     let data = await res.json();
//     setDeals(data);
// };

export function useFetch(url) {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetch(url)
            .then((res) => {
                setResponse(res.data);

                setLoading(false);
            })
            .catch(() => {
                setHasError(true);
                setLoading(false);
            });
    }, [url]);
    return [response, loading, hasError];
}
