import { authReducer } from "@app/Context/Auth/authReducer";
import authService from "@app/Services/AuthService";
import { AuthActionEnum, type AuthAction, type AuthState } from "@app/Types/auth.types";
import { createContext, useEffect, useReducer, type Dispatch, type ReactNode } from "react";
import { useRouteLoaderData } from "react-router";

export const initialAuthState: AuthState = {
    token: null,
    session: null,
    loading: false,
}

export const AuthContext = createContext<AuthState>(initialAuthState);
export const AuthDispatchContext = createContext<Dispatch<AuthAction>>(() => { });

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);

    useEffect(() => {
        const init = () => {
            // No token? Get it
            if (!state.token) {
                try {
                    authService.initTokenFromStorage()
                    const token = authService.getToken();
                    if (typeof token === "string") {
                        const decoded = authService.decodeAuthToken(token);
                        if (decoded && typeof decoded === "object") {
                            dispatch({ type: AuthActionEnum.SetToken, payload: { token } });
                            dispatch({ type: AuthActionEnum.Login, payload: decoded })
                        } else {
                            authService.deleteToken();
                        }

                    }
                } catch (error) {
                    console.log("Error initializing auth state:", error);
                } finally {
                    dispatch({ type: AuthActionEnum.SetLoading, payload: false });
                }
            }

            // No session? Set it
            if (!state.session) {

            }
        }
        init()
    }, [])

    return (
        <AuthContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    );
}

