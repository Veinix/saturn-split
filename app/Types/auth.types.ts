
export enum UserRoles {
    Developer = "developer",
    Admin = "admin",
    User = "user",
}

export type User = {
    id: string,
    username: string,
    password: string,
    full_name: string,
    favorite_color: string | null,
    role: UserRoles | null
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
    Login = "LOGIN",
    Logout = "LOGOUT",
    Register = "REGISTER",
    SetLoading = "SET_LOADING",
    RefreshToken = "REFRESH_TOKEN",
    SetToken = "SET_TOKEN",
}

export type AuthAction =
    | { type: AuthActionEnum.Logout }
    | { type: AuthActionEnum.Login, payload: SessionToken }
    | { type: AuthActionEnum.Register }
    | { type: AuthActionEnum.SetLoading, payload: boolean }
    | { type: AuthActionEnum.RefreshToken; payload: { token: string; session: SessionToken } }
    | { type: AuthActionEnum.SetToken; payload: { token: string } }