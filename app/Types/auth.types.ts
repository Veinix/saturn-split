
export type AuthContextType = {
    user: SessionDetails | null;
    loading: boolean;
    login: (loginDetails: LoginDetails) => void;
    logout: () => void;
};

export enum UserRoles {
    Developer = "developer",
    Manager = "manager",
    User = "user",
}

export type User = {
    id: string,
    username: string,
    email: string,
    password: string,
    phone_number?: string,
    full_name: string,
    favorite_color?: string,
    role?: UserRoles
}

export type RegisterUser = Omit<User, "id">

export type LoginDetails = {
    email: string,
    password: string,
}

export type SessionDetails = Pick<User, "id" | "full_name" | "favorite_color" | "role"> & { jwt: string }

