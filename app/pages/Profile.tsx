import GeneralButton from "@app/Components/General/GeneralButton"
import authService from "@app/Services/AuthService"
import { Form, redirect } from 'react-router'

export default function Profile() {

    return (
        <div className="flex items-center justify-center h-1/2 pt-10">
            <Form method="POST"
                className="flex items-center justify-center h-1/2 w-full">
                <GeneralButton
                    type="submit"
                    text={"Logout"}
                />
            </Form>
        </div>
    )
}

export async function clientAction() {
    await authService.logoutUser()
    // return redirect("/auth/login");
}