import type { LoginDetails, RegisterUser, SessionToken } from "@app/Types/auth.types"
import api from "./Axios"
import { tokenUtils } from "@app/Utilities/AuthUtilities";
type LoginReturn = {
    token: string,
    session: SessionToken
}
class AuthService {
    async loginUser({ username, password }: LoginDetails): Promise<LoginReturn | null> {
        try {
            const res = await api.post<{ token: string }>("/auth/login", { username, password })
            const token = res.data.token
            console.log(res)
            if (!res.data) {
                throw new Error("Invalid response from server");
            }
            const decoded = tokenUtils.decodeAuthToken(token)
            return { token: token, session: decoded }
        } catch (error) {
            console.log("[Auth Service] Error logging in", error)
            return null
        }
    }

    async logoutUser() {
        await api.post("/auth/logout")
    }

    async registerUser(userInfo: RegisterUser) {
        try {
            const res = await api.post("/auth/register", { userInfo })

        } catch (error) {
            console.log("[Auth Service] Error registering", error)
        }
    }
}

const authService = new AuthService()
export default authService