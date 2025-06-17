import { AuthContext, AuthDispatchContext } from "@app/Context/Auth/authContext";
import authService from "@app/Services/AuthService";
import { AuthActionEnum, type LoginDetails } from "@app/Types/auth.types";
import { useContext } from "react";

export const useAuth = () => {
    const authCtx = useContext(AuthContext);
    const { session, loading, token } = authCtx
    const dispatch = useContext(AuthDispatchContext)
    if (!authCtx || !dispatch) throw new Error("useAuth must be used within AuthProvider");

    const login = async ({ username, password }: LoginDetails) => {
        dispatch({ type: AuthActionEnum.SetLoading, payload: true })

        try {
            const data = await authService.loginUser({ username, password })
            if (data) {
                dispatch({ type: AuthActionEnum.Login, payload: data })
            }
            dispatch({ type: AuthActionEnum.SetLoading, payload: false })

        } catch (error) {
            console.log("Error @somewhere", error)
            dispatch({ type: AuthActionEnum.SetLoading, payload: false })

        }
    }

    return {
        session,
        loading,
        token,
        login
    };
};