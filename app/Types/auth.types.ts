
export type AuthContextType = {
    session: SessionDetails | null;
    loading: boolean;
    login: (loginDetails: LoginDetails) => void;
    logout: () => void;
    register: (registerDetails: RegisterDetails) => void
};

export enum UserRoles {
    Developer = "developer",
    Manager = "manager",
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

export type SessionDetails = {
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
