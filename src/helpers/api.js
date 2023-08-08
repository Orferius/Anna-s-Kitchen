import axios from "axios";
const BASE_URL = 'https://web-production-42bc.up.railway.app/api';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'applicaion/json'},
    withCredentials: true
});