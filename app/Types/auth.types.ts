export type Profile = {
    id: string;
    name: string;
    role: "admin" | "developer" | "member"
};
export type AuthStatus = "loading" | "authenticated" | "unauthenticated"
export type AuthContextType = {
    user: Profile | null;
    status: AuthStatus
    login: (user: Profile) => void;
    logout: () => void;
};