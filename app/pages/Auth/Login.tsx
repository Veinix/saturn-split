import LoadingScreen from "@app/Components/General/LoadingScreen"
import { useAuth } from "@app/Hooks/useAuth"
import useLoginHandler from "@app/Hooks/useLoginHandler"
import type { LoginDetails } from "@app/Types/auth.types"
import { tokenUtils } from "@app/Utilities/AuthUtilities"
import type { FormEvent } from "react"
import { Form, Navigate, NavLink, redirect, useNavigate } from "react-router"

export async function Loader() {
    const token = await tokenUtils.getToken()
    if (token) {
        throw redirect("/")
    }
}

export default function Login() {
    const { login, loading, session } = useAuth()
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
                const data = await login(loginDetails)
                if (data?.token) {
                    navigate("/")
                }
            }
        } catch (error) {
            navigate("/auth/login")
        }

    }

    if (session) return <Navigate to="./" replace={true} />

    return (
        <div className="flex flex-col mx-10 my-7">
            {loading && <div className="relative left-0 top-0 w-fit h-fit z-2">
                <LoadingScreen />
            </div>}
            <div className="mb-4 md:flex md:gap-2 md:items-center">
                <p className="text-4xl text-amber-700 font-bold">Oy, mate </p>
                <p className="text-3xl">you not logged innit?</p>
            </div>

            {/* Login Fields */}
            <div className="my-2">

                <form
                    onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={formFields.username.value}
                        onChange={(e) => handleInputChange(e, "username")}
                        className="bg-gray border border-gray-300 rounded-md p-3 w-full focus:border-black focus:outline-solid focus:outline-amber-700" placeholder="Username"
                    />
                    {formFields.username.error && <span className="inline"> {formFields.username.error}</span>}
                    <input
                        type="text"
                        value={formFields.password.value}
                        onChange={(e) => handleInputChange(e, "password")}
                        className="bg-gray border border-gray-300 rounded-md p-3 w-full mt-3 focus:border-black focus:outline-solid focus:outline-amber-700" placeholder="Password"
                    />
                    {formFields.password.error && <span>{formFields.password.error}</span>}
                    <button
                        className="bg-orange-500 text-white rounded-md p-2 py-4 mt-6 w-full hover:cursor-pointer hover:bg-orange-400 active:bg-orange-600"
                        type="submit"
                    >
                        Login
                    </button>
                </form>

            </div>
            <div className="flex flex-col items-center mt-3">
                <p> Don't have an account?</p>

                <NavLink
                    className={"text-amber-400 hover:text-amber-500"}
                    to={"/auth/register"}>
                    Click here
                </NavLink>
            </div>
        </div>
    )
}
