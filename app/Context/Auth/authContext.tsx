import { authReducer, initialAuthState } from "@app/Context/Auth/authReducer";
import { type AuthAction, type AuthState, type LoginDetails } from "@app/Types/auth.types";
import { createContext, useReducer, type Dispatch, type ReactNode } from "react";

export const AuthContext = createContext<AuthState>({
    session: null,
    loading: true,
    token: null,

});

export const AuthDispatchContext = createContext<Dispatch<AuthAction>>(() => { });

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);

    return (
        <AuthContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    );
}

