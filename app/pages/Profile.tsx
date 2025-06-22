import GeneralButton from "@app/Components/General/GeneralButton"
import { useAuth } from "@app/Hooks/useAuth"
import appConfig from "@app/Utilities/AppConfig"
import { Form, redirect } from 'react-router'

export default function Profile() {
    const { logout } = useAuth()
    const handleClick = () => {
        logout()
    }
    return (
        <div className="flex items-center justify-center h-1/2">
            <Form method="POST"
                className="flex items-center justify-center h-1/2 w-full">
                <GeneralButton
                    type="submit"
                    text={"Logout"}
                    onClick={handleClick} />
            </Form>
        </div>
    )
}

export async function clientAction() {
    localStorage.removeItem(appConfig.localStorageJWTKey);
    return redirect("/auth/login");
}