import axios from "axios";
import { appConfig } from "~/Utilities/AppConfig";
import { tokenUtils } from "~/Utilities/AuthUtilities";

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