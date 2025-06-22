import { data, NavLink, redirect, useFetcher } from "react-router"
import type { Route } from "./+types/Login"
import { LoginSchema } from "@app/Schemas/LoginSchema"
import authService from "@app/Services/AuthService"

export default function Login() {
    const fetcher = useFetcher()
    const errors = fetcher.data?.errors
    const isSubmitting = fetcher.state === "submitting"



    return (
        <div className="flex flex-col mx-10 my-7 w-full px-12">

            <div className="mb-4 md:flex md:gap-2 md:items-center md:flex-col">
                <p className="text-4xl text-amber-700 font-bold w-full">Oy, mate </p>
                <p className="text-2xl w-full">you not logged innit?</p>
            </div>

            {/* Login Fields */}

            <fetcher.Form method="POST">
                <input
                    type="text"
                    name="username"
                    className="bg-gray border border-gray-300 rounded-md p-3 w-full focus:border-black focus:outline-solid focus:outline-amber-700" placeholder="Username"
                />
                {!isSubmitting && errors?.username ? <em className="w-min">{errors.username}</em> : null}
                <input
                    type="text"
                    name="password"
                    className="bg-gray border border-gray-300 rounded-md p-3 w-full mt-3 focus:border-black focus:outline-solid focus:outline-amber-700" placeholder="Password"
                />
                {!isSubmitting && errors?.password ? <em className="w-min">{errors.password}</em> : null}
                {!isSubmitting && errors?.loginFail ? <em className="w-min">{errors.loginFail}</em> : null}
                <button
                    className="bg-orange-500 text-white rounded-md p-2 py-4 mt-6 w-full hover:cursor-pointer hover:bg-orange-400 active:bg-orange-600"
                    disabled={isSubmitting}
                    type="submit"
                >
                    {fetcher.state === "submitting" ? "Logging in…" : "Log In"}
                </button>
            </fetcher.Form>

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
        const loginAttempt = await authService.loginUser(result.data)
        console.log("Login attempt", loginAttempt)
        if (loginAttempt?.token) {
            authService.setToken(loginAttempt.token)
            return redirect("/")
        } else {
            errors = { loginFail: "Login attempt failed" }
            return data({ errors }, { status: 400 })
        }
    }

}