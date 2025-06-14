import authService from "@app/Services/AuthService";
import { type AuthState, type AuthAction, AuthActionEnum } from "@app/Types/auth.types";

export const initialAuthState: AuthState = {
    token: null,
    session: null,
    loading: false,
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {

        case AuthActionEnum.LoginRequest:
            return {
                ...state,
                loading: true,
            };
        case AuthActionEnum.LoginSuccess:
            return {
                ...state,
                // token: action.payload.token,
                // session: action.payload.session,
                loading: false,
            };
        case AuthActionEnum.LoginFailure:
            return {
                ...state,
                token: null,
                session: null,
                loading: false,
            };

        case AuthActionEnum.Logout:
            return {
                ...state,
                token: null,
                session: null,
                loading: false,
            };

        case AuthActionEnum.Refresh:
            return {
                ...state,
                token: action.payload.token,
                session: action.payload.session,
            };

        default:
            return state;
    }
}