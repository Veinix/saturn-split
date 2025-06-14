import { authReducer, initialAuthState } from "@app/Context/Auth/authReducer";
import api from "@app/Services/Axios";
import { AuthActionEnum, UserRoles, type AuthContextType, type AuthState, type LoginDetails, type RegisterDetails, type SessionToken } from "@app/Types/auth.types";
import { tokenUtils } from "@app/Utilities/AuthUtilities";
import { createContext, useEffect, useMemo, useReducer, useState, type ReactNode } from "react";
import { redirect, useRouteLoaderData } from "react-router";

export const AuthContext = createContext<AuthState>({
    session: null,
    loading: true,
    token: null,
    
});

export const AuthDispatchContext = createContext(null);

export default function AuthProvider({ children }: { children: ReactNode }) {

    const [state, dispatch] = useReducer(authReducer, initialAuthState);

    const login = async (loginDetails: LoginDetails) => {
        dispatch({ type: AuthActionEnum.LoginRequest });
    }


    return (
        <AuthContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    );
}

