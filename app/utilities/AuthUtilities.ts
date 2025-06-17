import type { SessionToken } from "@app/Types/auth.types";
import appConfig from "./AppConfig";

class TokenUtils {
    private inMemoryToken: string | null = null;
    async setToken(token: string | null) {
        this.inMemoryToken = token;
        token ? localStorage.setItem(appConfig.localStorageJWTKey, JSON.stringify(token))
            : localStorage.removeItem(appConfig.localStorageJWTKey)
    }

    getToken(): string | null {
        if (this.inMemoryToken) return this.inMemoryToken;
        const storedToken = localStorage.getItem(appConfig.localStorageJWTKey)
        return storedToken ? storedToken : null;
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
        console.log(parsed)
        return parsed
    }

    initTokenFromStorage() {
        this.inMemoryToken = localStorage.getItem(appConfig.localStorageJWTKey);
    }
}

const tokenUtils = new TokenUtils()

export {
    tokenUtils
}