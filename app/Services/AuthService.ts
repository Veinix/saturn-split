import type { LoginDetails, RegisterUser } from "@app/Types/auth.types"
import api from "./Axios"

class AuthService {
    async loginUser({ username, password }: LoginDetails) {
        try {
            const res = await api.get("/auth/login")
            console.log(res.data)
            return res.data
        } catch (error) {
            console.log("[Auth Service] Error logging in", error)
        }
    }

    async logoutUser() {
        await api.get("/auth/logout")
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