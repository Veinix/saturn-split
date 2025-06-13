import appConfig from "@app/Utilities/AppConfig";
import { tokenUtils } from "@app/Utilities/AuthUtilities";
import axios from "axios";


const api = axios.create({
    baseURL: appConfig.baseApiEndpoint,
    headers: {
        "Content-Type": "application/json",
    }
})

// Request interceptor: Attach JWT
api.interceptors.request.use(
    async (config) => {
        const token = tokenUtils.getToken();
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: Handle expired/invalid token
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            tokenUtils.setToken(null); // Wipe token
            // Optionally redirect to login, show modal, or notify
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api