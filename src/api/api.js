import axios from "axios";

//FIXME set token
const API_TOKEN = "";
const API_URL = `https://srp-auto.inno.ws/bot/v1/cvbuilder-threads`;

export const api = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
        'Accept': 'application/json',
        "content-type": "application/json",
        "Authorization": `Bearer ${API_TOKEN}`
    }
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);