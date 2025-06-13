import api from "@app/Services/Axios";
import type { AuthContextType, LoginDetails, RegisterDetails, SessionDetails } from "@app/Types/auth.types";
import { tokenUtils } from "@app/Utilities/AuthUtilities";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { redirect, useNavigate } from "react-router";

const AuthContext = createContext<AuthContextType>({
    session: null,
    loading: true,
    login: async (loginDetails: LoginDetails) => { },
    logout: async () => { },
    register: async (registerDetails: RegisterDetails) => { }
});

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<SessionDetails | null>(null);
    const [token, setToken] = useState<string | null>("")
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate()
    useEffect(() => {
        async function init() {
            try {
                tokenUtils.initTokenFromStorage()
                const stored = tokenUtils.getToken()
                if (stored) {
                    const decodedToken = tokenUtils.decodeAuthToken(stored)
                    setToken(stored)
                    setSession(decodedToken)
                    setLoading(false)
                } else {
                    setSession(null);
                    setLoading(false);
                }
            } catch (err) {
                setSession(null);
                setLoading(false);
            }
        }
        init()
    }, []);

    const login = async ({ username, password }: LoginDetails) => {
        setLoading(true);
        try {
            const res = await api.post("/auth/login", { username, password });
            setToken(res.data.token);
            setSession(res.data.user);
            await tokenUtils.setToken(res.data.token)
            // redirect("./")
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false);
        }
    }

    const logout = async () => {
        setLoading(true);
        try {
            await tokenUtils.deleteToken()
            await api.post("/auth/logout");
            setToken(null);
            setSession(null);
            // redirect("./")
        } finally {
            setLoading(false);
        }
    }

    const register = async (registerDetails: RegisterDetails) => {
        try {

        } catch (error) {

        }
    }

    return (
        <AuthContext.Provider value={{ session, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const authCtx = useContext(AuthContext);
    if (!authCtx) throw new Error("useAuth must be used within AuthProvider");
    return authCtx;
};