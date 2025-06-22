import authService from "@app/Services/AuthService";
import { Outlet, redirect } from "react-router";

export async function clientLoader() {
    const token = authService.getToken()
    if (token) return redirect("/")
}
clientLoader.hydrate = true as const;

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-10/12 h-10/12 md:w-1/3 md:h-1/3 flex flex-col border-amber-600 border rounded-2xl items-center">
                <Outlet />
            </div>
        </div>
    )
}

