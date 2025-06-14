import LoadingScreen from "@app/Components/General/LoadingScreen"
import { useAuth } from "@app/Hooks/useAuth"
import useLoginHandler from "@app/Hooks/useLoginHandler"
import type { LoginDetails } from "@app/Types/auth.types"
import type { ChangeEvent, FormEvent } from "react"
import { redirect, replace, useNavigate } from "react-router"

function Login() {
    const { login, loading } = useAuth()
    const { formFields, handleInputChange, validatePassword, validateUsername } = useLoginHandler()
    const navigate = useNavigate()
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const validPassword = validatePassword(formFields.password.value)
            const validUsername = validateUsername(formFields.username.value)
            if (validPassword && validUsername) {
                const loginDetails: LoginDetails = {
                    username: formFields.username.value,
                    password: formFields.password.value
                }
                await login(loginDetails)
                navigate("/")
            }
        } catch (error) {
            console.error("Login failed:", error)
            redirect("/auth/login")
        }

    }
    return (
        <div className="flex items-center justify-center flex-col mx-10 my-7">
            {loading && <div className="relative left-0 top-0 w-fit h-fit z-2">
                <LoadingScreen />
            </div>}
            <span className="text-4xl mb-10">Oi , you not logged in innit?</span>

            {/* Login Fields */}
            <div>
                <form
                    onSubmit={handleSubmit}>
                    <p className="pb-3"> Input your username and password to login</p>
                    <input
                        type="text"
                        value={formFields.username.value}
                        onChange={(e) => handleInputChange(e, "username")}
                        className="bg-gray border border-gray-300 rounded-md p-2 w-full" placeholder="Username"
                    />
                    {formFields.username.error && <span> {formFields.username.error}</span>}
                    <input
                        type="password"
                        value={formFields.password.value}
                        onChange={(e) => handleInputChange(e, "password")}
                        className="bg-gray border border-gray-300 rounded-md p-2 w-full mt-3" placeholder="Password"
                    />
                    {formFields.password.error && <span>{formFields.password.error}</span>}
                    <button
                        className="bg-orange-500 text-white rounded-md p-2 mt-3 w-full hover:cursor-pointer"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login