import { type AuthState, type AuthAction, AuthActionEnum } from "@app/Types/auth.types";

export const initialAuthState: AuthState = {
    token: null,
    session: null,
    loading: false,
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {

        case AuthActionEnum.Login:
            return {
                ...state,
                session: action.payload
            };

        case AuthActionEnum.Register:
            return {
                ...state,
            };

        case AuthActionEnum.Logout:
            return {
                ...state,
                token: null,
                session: null,
                loading: false,
            };

        case AuthActionEnum.RefreshToken:
            return {
                ...state,
                token: action.payload.token,
                session: action.payload.session,
            };
        case AuthActionEnum.SetToken:
            return {
                ...state,
                token: action.payload.token

            }
        case AuthActionEnum.SetLoading:
            return {
                ...state,
                loading: action.payload
            };

        default:
            return state;
    }
}