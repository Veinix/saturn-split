import LabelledInput from "@app/Components/General/LabelledInput";
import appConfig from "@app/Utilities/AppConfig";
import { useState } from "react";
import { data, Form, NavLink, redirect, useFetcher } from "react-router"
import type { Route } from "./+types/Register";
import LoadingScreen from "@app/Components/General/LoadingScreen";
import authService from "@app/Services/AuthService";
import { UserRoles, type RegisterUser } from "@app/Types/auth.types";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Saturn Split | Register" },
        { name: "description", content: "Welcome to Saturn Split!" },
    ];
}

export default function Register() {
    const fetcher = useFetcher()
    const favColorsArr = appConfig.favoriteColors
    const errors = fetcher.data?.errors

    const [selected, setSelected] = useState<string>(favColorsArr[0].value);
    return (
        <div className="mx-10 my-4">
            <p className="text-4xl text-orange-600 font-bold pb-3">So tell me..</p>
            <fetcher.Form method="POST"
                className="md:grid md:grid-cols-2 md:gap-4">
                <div>
                    <LabelledInput
                        label="Username"
                        name="username"
                    />
                    {errors?.username ? <em>{errors.username}</em> : null}
                </div>
                <div>

                    <LabelledInput
                        label="Name"
                        name="name"

                    />
                    {errors?.name ? <em>{errors.name}</em> : null}
                </div>
                <div>
                    <LabelledInput
                        label="Password"
                        name="password"
                        type="password"
                    />
                    {errors?.password ? <em>{errors.password}</em> : null}
                </div>
                <LabelledInput
                    label={"Favorite Color"}>

                    <div className="grid grid-cols-6 gap-2">
                        {favColorsArr.map(({ name, value }) => (
                            <label
                                key={value}
                                className={` relative cursor-pointer w-10 h-10 rounded-md border-2 border-white ${selected === value ? "ring-2 ring-offset-2 ring-amber-500" : ""}`}
                                style={{ backgroundColor: value }}>
                                {/* Visually hidden radio */}
                                <input
                                    type="radio"
                                    name="favoriteColor"
                                    value={value}
                                    checked={selected === value}
                                    onChange={() => setSelected(value)}
                                    className="sr-only"
                                />
                            </label>
                        ))}
                    </div>
                </LabelledInput>
                {errors?.favoriteColor ? <em>{errors.favoriteColor}</em> : null}
                {errors?.general ? <em className="mt-3">{errors.general}</em> : null}

                {fetcher.state !== "submitting"
                    ? <button className="bg-orange-500 text-white rounded-md p-2 py-4 mt-6 w-full hover:cursor-pointer hover:bg-orange-400 active:bg-orange-600 md:col-span-2 "
                        type="submit">Sign Up</button>
                    : <>
                        <LoadingScreen />
                    </>}
            </fetcher.Form>
            <div className="flex flex-col items-center mt-3">
                <p> Already have an account?</p>

                <NavLink
                    className={"text-amber-400 hover:text-amber-500"}
                    to={"/auth/login"}>
                    Click here
                </NavLink>
            </div>
        </div >
    )
}

export async function clientAction({
    request,
}: Route.ActionArgs) {
    const formData = await request.formData()

    const name = String(formData.get("name"))
    const password = String(formData.get("password"))
    const username = String(formData.get("username"))
    const favoriteColor = String(formData.get("favoriteColor"))

    const errors: Record<string, string> = {}

    if (!name) {
        errors.name = "Name is required"
    }

    if (!username) {
        errors.username = "Username is required"
    } else if (username.length < 3) {
        errors.username = "Username must be at least 3 characters long"
    }

    if (!password) {
        errors.password = "Password is required"
    } else if (password.length < 6) {
        errors.password = "Password must be at least 6 characters long"
    }

    if (!favoriteColor) {
        errors.favoriteColor = "Favorite color is required"
    }

    if (Object.keys(errors).length > 0) {
        return data({ errors }, { status: 400 });
    }
    const res = await authService.registerUser({
        full_name: name,
        username,
        password,
        favorite_color: favoriteColor,
        role: UserRoles.Developer
    })
    if (!res) {
        return data({ errors: { general: "Failed to register user" } }, { status: 500 });
    } else {
        await authService.loginUser({ username, password })
    }

    return redirect("/")

}