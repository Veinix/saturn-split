import type { Profile } from "~/Types/auth.types"

class AuthService {
    async getCurrentUser() {
        const user: Profile = {
            id: "c5590187-d38d-4eb2-9889-200e910968b8",
            name: "David Aviles",
            role: "developer",
        }
        return await user
    }
}

const authService = new AuthService()
export default authService