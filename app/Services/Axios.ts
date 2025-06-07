import axios from "axios";
import { appConfig } from "~/Utilities/AppConfig";

const api = axios.create({
    baseURL: appConfig.baseApiEndpoint,
    headers: {
        "Content-Type": "application/json",
    }
})

export default api