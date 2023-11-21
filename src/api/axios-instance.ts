import axios from "axios";

export const Axios = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    timeout: 5000,
});
