import appConfig from "@app/utilities/AppConfig";
import { UserRoles, type LoginDetails, type RegisterUser, type SessionToken } from "@app/types/auth.types"
import api from "./Axios"
import { Logger } from "@app/utilities/Logger";

let inMemoryToken: string | null = null;

type LoginReturn = {
    token: string,
    session: SessionToken
}
class AuthService extends Logger {

    //* Utility Methods *\\
    authLog(message: any, error?: Error) {
        this.log("Auth", message, error)
    }

    //* Base Auth *\\
    async loginUser({ username, password }: LoginDetails): Promise<LoginReturn | null> {
        try {
            const res = await api.post<{ token: string }>("/auth/login", { username, password })
            const token = res.data.token

            if (!res.data) {
                throw new Error("Invalid response from server");
            }
            this.setToken(token)
            const decoded = this.decodeAuthToken(token)
            return { token: token, session: decoded }
        } catch (error) {
            this.authLog(error)
            return null
        }
    }

    async logoutUser() {
        this.setToken(null)
        await api.post("/auth/logout")
    }

    async registerUser(data: RegisterUser) {
        try {
            const res = await api.post("/auth/register", {
                username: data.username,
                password: data.password,
                full_name: data.full_name,
                favorite_color: data.favorite_color,
                role: data.role
            })
            if (res.status === 201) {
                this.authLog("User registered successfully")
                return res.data
            } else {
                this.authLog("Failed to register", new Error(`Status: ${res.status}`))
                return null
            }
        } catch (error) {
            console.log("[Auth Service] Error registering", error)
        }
    }

    // isAuthenticated() {
    //     return Boolean(this.getToken());
    // }

    //* Token Methods *\\
    setToken(token: string | null) {
        token ? localStorage.setItem(appConfig.localStorageJWTKey, JSON.stringify(token))
            : localStorage.removeItem(appConfig.localStorageJWTKey)
    }

    getToken(): string | null {
        if (inMemoryToken !== null) return inMemoryToken;
        const storedToken = localStorage.getItem(appConfig.localStorageJWTKey)
        return storedToken ? JSON.parse(storedToken) : null;
    }

    deleteToken() {
        localStorage.removeItem(appConfig.localStorageJWTKey)
    }

    decodeAuthToken(token: string): SessionToken {
        const [, payload] = token.split('.');
        if (!payload) {
            throw new Error('Invalid JWT');
        }
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        const json = atob(base64);
        const parsed = JSON.parse(json)
        return parsed
    }

    initTokenFromStorage(key: string = appConfig.localStorageJWTKey) {
        const token = localStorage.getItem(key);
        inMemoryToken = token ? JSON.parse(token) : null;
    }


}

const authService = new AuthService()
export default authService