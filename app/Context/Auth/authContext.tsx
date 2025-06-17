import { authReducer } from "@app/Context/Auth/authReducer";
import { AuthActionEnum, type AuthAction, type AuthState } from "@app/Types/auth.types";
import { tokenUtils } from "@app/Utilities/AuthUtilities";
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

    // useEffect(() => {
    //     const init = async () => {
    //         try {
    //             tokenUtils.initTokenFromStorage()
    //             const token = tokenUtils.getToken();
    //             if (typeof token === "string") {
    //                 const decoded = tokenUtils.decodeAuthToken(token);
    //                 if (decoded && typeof decoded === "object") {
    //                     dispatch({ type: AuthActionEnum.SetToken, payload: { token } });
    //                     dispatch({ type: AuthActionEnum.Login, payload: decoded })
    //                 } else {
    //                     tokenUtils.deleteToken();
    //                 }

    //             }
    //         } catch (error) {
    //             console.log("Error initializing auth state:", error);
    //         } finally {
    //             dispatch({ type: AuthActionEnum.SetLoading, payload: false });
    //         }
    //     }
    //     init()
    // })

    return (
        <AuthContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    );
}

