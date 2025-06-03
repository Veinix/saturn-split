import axios from "axios";
import { appConfig } from "~/Utilities/AppConfig";

const api = axios.create({
    baseURL: appConfig.postmanApiUrl,
    headers: {
        "Content-Type": "application/json",
    }
})

export default api