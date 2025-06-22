import LoadingScreen from "@app/Components/General/LoadingScreen"
import { useAuth } from "@app/Hooks/useAuth"
import { data, NavLink, redirect, useFetcher } from "react-router"
import type { Route } from "./+types/Login"
import { LoginSchema } from "@app/Schemas/LoginSchema"
import authService from "@app/Services/AuthService"

// export async function clientLoader() {
//     const token = await tokenUtils.getToken()
//     if (token) {
//         throw redirect("/")
//     }
// }

export default function Login() {
    const fetcher = useFetcher()
    const errors = fetcher.data?.errors
    const isSubmitting = fetcher.state === "submitting"

    const { login, loading, session } = useAuth()
    // const { formFields, handleInputChange, validatePassword, validateUsername } = useLoginHandler()
    // const navigate = useNavigate()



    // const handleSubmit = async (e: FormEvent) => {
    //     e.preventDefault()
    //     try {
    //         const validPassword = validatePassword(formFields.password.value)
    //         const validUsername = validateUsername(formFields.username.value)
    //         if (validPassword && validUsername) {
    //             const loginDetails: LoginDetails = {
    //                 username: formFields.username.value,
    //                 password: formFields.password.value
    //             }
    //             const data = await login(loginDetails)
    //             if (data?.token) {
    //                 navigate("/")
    //             }
    //         }
    //     } catch (error) {
    //         navigate("/auth/login")
    //     }

    // }

    // if (session) return <Navigate to="./" replace={true} />

    return (
        <div className="flex flex-col mx-10 my-7">
            {loading && <div className="relative left-0 top-0 w-fit h-fit z-2">
                <LoadingScreen />
            </div>}
            <div className="mb-4 md:flex md:gap-2 md:items-center md:flex-col">
                <p className="text-4xl text-amber-700 font-bold w-full">Oy, mate </p>
                <p className="text-2xl w-full">you not logged innit?</p>
            </div>

            {/* Login Fields */}
            <div className="my-2">

                <fetcher.Form method="POST">
                    <input
                        type="text"
                        name="username"
                        // value={formFields.username.value}
                        className="bg-gray border border-gray-300 rounded-md p-3 w-full focus:border-black focus:outline-solid focus:outline-amber-700" placeholder="Username"
                    />
                    {!isSubmitting && errors?.username ? <em>{errors.username}</em> : null}
                    {/* {formFields.username.error && <span className="inline"> {formFields.username.error}</span>} */}
                    <input
                        type="text"
                        name="password"
                        // value={formFields.password.value}
                        className="bg-gray border border-gray-300 rounded-md p-3 w-full mt-3 focus:border-black focus:outline-solid focus:outline-amber-700" placeholder="Password"
                    />
                    {!isSubmitting && errors?.password ? <em>{errors.password}</em> : null}
                    {!isSubmitting && errors?.loginFail ? <em>{errors.loginFail}</em> : null}
                    {/* {formFields.password.error && <span>{formFields.password.error}</span>} */}
                    <button
                        className="bg-orange-500 text-white rounded-md p-2 py-4 mt-6 w-full hover:cursor-pointer hover:bg-orange-400 active:bg-orange-600"
                        disabled={isSubmitting}
                        type="submit"
                    >
                        Login
                    </button>
                </fetcher.Form>

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


export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData()
    const username = String(formData.get("username"))
    const password = String(formData.get("password"))

    let errors: Record<string, string> = {}

    const result = LoginSchema.safeParse({ username, password })
    if (!result.success) {
        // map Zod errors to fieldErrors…
        errors = Object.fromEntries(
            Object.entries(result.error.flatten().fieldErrors).map(
                ([k, v]) => [k, v?.[0]]
            )
        )
        if (Object.keys(errors).length > 0) {
            return data({ errors }, { status: 400 });
        }
    } else {
        errors = {}
        console.log("Success: ", result.data)
        const loginAttempt = await authService.loginUser(result.data)
        
        if (loginAttempt?.token) {
            return redirect("/")
        } else {
            errors = { loginFail: "Login attempt failed" }
            return data({ errors }, { status: 400 })
        }
    }

}