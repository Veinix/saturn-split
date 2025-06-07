import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import authService from "~/Services/AuthService";
import type { AuthContextType, AuthStatus, Profile } from "~/Types/auth.types";


const AuthContext = createContext<AuthContextType>({
    user: null,
    status: "loading",
    login: async (userData: Profile) => { },
    logout: async () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<Profile | null>(null);
    const [status, setStatus] = useState<AuthStatus>("loading");

    useEffect(() => {
        // Load from localStorage or Supabase session
        async function fetchCurrentUser() {
            try {
                const stored = localStorage.getItem("profile");
                if (stored) {
                    setUser(JSON.parse(stored))
                    setStatus("authenticated")
                } else {
                    const currentUser = await authService.getCurrentUser();
                    if (currentUser) {
                        setUser(currentUser);
                        setStatus("authenticated");
                        localStorage.setItem("profile", JSON.stringify(currentUser))
                    } else {
                        setUser(null);
                        setStatus("unauthenticated");
                    }
                }
            } catch (err) {
                // if unauthorized or error, treat as unauthenticated
                setUser(null);
                setStatus("unauthenticated");
            }
        }
        fetchCurrentUser()
    }, []);

    const login = (userData: Profile) => {
        setUser(userData);
        setStatus("authenticated")
        localStorage.setItem("profile", JSON.stringify(userData));

    };

    const logout = () => {
        setUser(null);
        setStatus("unauthenticated")
        localStorage.removeItem("profile");
    };

    return (
        <AuthContext.Provider value={{ user, status, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const authCtx = useContext(AuthContext);
    if (!authCtx) throw new Error("useAuth must be used within AuthProvider");
    return authCtx;
};