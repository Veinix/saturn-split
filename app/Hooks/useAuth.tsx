import { AuthContext, AuthDispatchContext } from "@app/Context/Auth/authContext";
import authService from "@app/Services/AuthService";
import { AuthActionEnum, type LoginDetails } from "@app/Types/auth.types";
import { tokenUtils } from "@app/Utilities/AuthUtilities";
import { useCallback, useContext } from "react";

export const useAuth = () => {
    const { session, loading, token } = useContext(AuthContext);
    const dispatch = useContext(AuthDispatchContext)
    if (!dispatch) throw new Error("useAuth must be used within AuthProvider");

    const login = useCallback(
        async ({ username, password }: LoginDetails) => {
            dispatch({ type: AuthActionEnum.SetLoading, payload: true })

            try {
                const data = await authService.loginUser({ username, password })
                if (data) {
                    tokenUtils.setToken(data.token)
                    dispatch({ type: AuthActionEnum.SetToken, payload: { token: data.token } })
                    dispatch({ type: AuthActionEnum.Login, payload: data.session })
                }
                dispatch({ type: AuthActionEnum.SetLoading, payload: false })
                return data

            } catch (error) {
                console.log("Error @somewhere", error)
                dispatch({ type: AuthActionEnum.SetLoading, payload: false })
            }

        }, [dispatch])

    const logout = useCallback(() => {
        tokenUtils.deleteToken()
        dispatch({ type: AuthActionEnum.Logout });
    }, [dispatch])

    return {
        session,
        loading,
        token,
        login,
        logout
    };
};