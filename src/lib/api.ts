import { AUTH_TOKEN } from "@/constants";
import axios from "axios";

const token = localStorage.getItem(AUTH_TOKEN);

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
    headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : ""
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(AUTH_TOKEN);
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            console.log("Token expired or invalid");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
