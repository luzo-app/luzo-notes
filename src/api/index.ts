import axios, { AxiosResponse } from "axios";
import {
    API_URL,
    PREFIX_BASE_URL
} from "@/api/constants";
import { getCookie } from "@/lib/cookies";

const api = axios.create({
    baseURL: `${API_URL}${PREFIX_BASE_URL}`,
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = getCookie("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse | Promise<AxiosResponse> => {
        if (/20/.test(response.status.toString())) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    async (error) => {
        // Handle network error
        if (error.code === "ERR_NETWORK") {
            return Promise.reject({ data: { detail: "Network error" } });
        }

        return Promise.reject(error);
    }
);

export default api;