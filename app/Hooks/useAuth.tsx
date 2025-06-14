import { AuthContext } from "@app/Context/Auth/authContext";
import type { LoginDetails } from "@app/Types/auth.types";
import { useContext } from "react";

export const useAuth = () => {
    const authCtx = useContext(AuthContext);
    if (!authCtx) throw new Error("useAuth must be used within AuthProvider");

    const login = async ({ username, password }: LoginDetails) => {
    }

    return authCtx;
};