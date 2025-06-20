import LabelledInput from "@app/Components/General/LabelledInput";
import appConfig from "@app/Utilities/AppConfig";
import { useState } from "react";
import { Form, useFetcher } from "react-router"
import type { Route } from "./+types/Register";


export default function Register() {
    const fetcher = useFetcher()
    const favColorsArr = appConfig.favoriteColors
    const [selected, setSelected] = useState<string>(favColorsArr[0].value);
    return (
        <div className="mx-10 my-4">
            <p className="text-4xl text-orange-600 font-bold pb-3">So tell me..</p>
            <fetcher.Form>
                <LabelledInput
                    label="Username"
                    name="username"
                />
                <LabelledInput
                    label="Name"
                    name="name"

                />
                <LabelledInput
                    label="Password"
                    name="password"
                    type="password"
                />
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

                <button className="bg-orange-500 text-white rounded-md p-2 py-4 mt-6 w-full hover:cursor-pointer hover:bg-orange-400 active:bg-orange-600"
                    type="submit">Sign Up</button>
            </fetcher.Form>
        </div >
    )
}

export async function clientAction({
    request,
}: Route.ActionArgs) {
    const formData = await request.formData()
    const name = String(formData.get("name"))
    const password = String(formData.get("password"))
}