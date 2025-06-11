import { appConfig } from "./AppConfig";

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

    // Call this on app mount to initialize the memory from storage if needed
    initTokenFromStorage() {
        inMemoryToken = localStorage.getItem(appConfig.localStorageJWTKey);
    }
}

const tokenUtils = new TokenUtils()

export { tokenUtils }