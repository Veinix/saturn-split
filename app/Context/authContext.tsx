import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import api from "~/Services/Axios";
import type { AuthContextType, LoginDetails, SessionDetails } from "~/Types/auth.types";
import { tokenUtils } from "~/Utilities/AuthUtilities";

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: async (loginDetails: LoginDetails) => { },
    logout: async () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<SessionDetails | null>(null);
    const [token, setToken] = useState<string | null>("")
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function init() {
            try {
                tokenUtils.initTokenFromStorage()
                const stored = tokenUtils.getToken()
                if (stored) {
                    setUser(JSON.parse(stored))
                    setLoading(false)
                } else {
                    setUser(null);
                    setLoading(false);
                }
            } catch (err) {
                // if unauthorized or error, treat as unauthenticated
                setUser(null);
                setLoading(false);
            }
        }
        init()
    }, []);

    const login = async ({ email, password }: LoginDetails) => {
        setLoading(true);
        try {
            const res = await api.post("/auth/login", { email, password });
            setToken(res.data.token);
            setUser(res.data.user);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            setToken(null);
            setUser(null);
            // Optionally call your backend to invalidate token/server-side session
            await api.post("/auth/logout");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const authCtx = useContext(AuthContext);
    if (!authCtx) throw new Error("useAuth must be used within AuthProvider");
    return authCtx;
};