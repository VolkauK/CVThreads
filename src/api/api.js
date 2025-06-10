import axios from "axios";

//FIXME set token
const API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhdXRvX3NhbGVzIiwiaWF0IjoxNzMzNzQ1ODM3LCJuYmYiOjE3MzM3NDU4MzcsImp0aSI6IjA1MGM3ZjZiLTI1NDQtNDVlNS04YTdiLWU3ZmVhYmU4YmU3ZCIsImV4cCI6MjAzNjE0NTgzNywidHlwZSI6ImFjY2VzcyIsImZyZXNoIjpmYWxzZX0.XD6y7stlHraoTIhPnLCUirwYlREaz1PiLZBU14b0RtQ";
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