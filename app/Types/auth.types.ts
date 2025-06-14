
export enum UserRoles {
    Developer = "developer",
    Admin = "admin",
    User = "user",
}

export type User = {
    id: string,
    username: string,
    password: string,
    phone_number?: string,
    full_name: string,
    favorite_color?: string,
    role?: UserRoles
}

export type RegisterUser = Omit<User, "id">

export type LoginDetails = {
    username: string,
    password: string,
}

export type RegisterDetails = Omit<User, "id">

export type SessionToken = {
    userData: {
        partialName: string,
        role: UserRoles,
        userId: string,
        username: string,
        favoriteColor: string
    },
    iat: number,
    exp: number
}

export type Session = Omit<SessionToken, "iat" | "exp">;

export type AuthState = {
    session: SessionToken | null,
    token: string | null,
    loading: boolean,
    error?: any

};

export type AuthContextType = AuthState & {
    login: (loginDetails: LoginDetails) => void;
    logout: () => void;
    register: (registerDetails: RegisterDetails) => void
};

export enum AuthActionEnum {
    LoginRequest = "LOGIN_REQUEST",
    LoginSuccess = "LOGIN_SUCCESS",
    LoginFailure = "LOGIN_FAILURE",
    Logout = "LOGOUT",
    SetLoading = "SET_LOADING",
    Refresh = "REFRESH_TOKEN",
}

export type AuthAction =
    | { type: AuthActionEnum.Logout }
    | { type: AuthActionEnum.LoginRequest }
    | { type: AuthActionEnum.LoginSuccess }
    | { type: AuthActionEnum.LoginFailure }
    | { type: AuthActionEnum.Refresh; payload: { token: string; session: SessionToken } };