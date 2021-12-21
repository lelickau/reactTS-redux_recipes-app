import axios from 'axios';

export const API_URL = 'https://test-jwt-server-lelickau.herokuapp.com/api';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});


export default $api;