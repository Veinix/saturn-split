import authService from "@app/services/AuthService";
import appConfig from "@app/utilities/AppConfig";
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
        const token = authService.getToken();
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api