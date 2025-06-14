import type { LoginDetails, RegisterUser, SessionToken } from "@app/Types/auth.types"
import api from "./Axios"

class AuthService {
    async loginUser({ username, password }: LoginDetails): Promise<SessionToken | null> {
        try {
            const res = await api.post<SessionToken>("/auth/login", { username, password })
            console.log(res)
            // console.log(JSON.parse(res))
            if (!res.data || !res.data.userData) {
                throw new Error("Invalid response from server");
            }
            return res.data
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