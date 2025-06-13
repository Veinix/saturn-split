import type { SessionDetails } from "@app/Types/auth.types";
import appConfig from "./AppConfig";

let inMemoryToken: string | null = null;

class TokenUtils {
    setToken(token: string | null) {
        inMemoryToken = token;
        token ? localStorage.setItem(appConfig.localStorageJWTKey, JSON.stringify(token))
            : localStorage.removeItem(appConfig.localStorageJWTKey)
    }

    getToken(): string | null {
        if (inMemoryToken) return inMemoryToken;
        const storedToken = localStorage.getItem(appConfig.localStorageJWTKey)
        return storedToken ? JSON.parse(storedToken) : null;
    }

    deleteToken() {
        localStorage.removeItem(appConfig.localStorageJWTKey)
    }

    decodeAuthToken(token: string): SessionDetails {
        const [, payload] = token.split('.');
        if (!payload) {
            throw new Error('Invalid JWT');
        }
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        const json = atob(base64);
        return JSON.parse(json);
    }

    initTokenFromStorage() {
        inMemoryToken = localStorage.getItem(appConfig.localStorageJWTKey);
    }
}

const tokenUtils = new TokenUtils()

export {
    tokenUtils
}