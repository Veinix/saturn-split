import Navbar from "@app/Components/LayoutArea/Navbar";
import authService from "@app/Services/AuthService";
import { Outlet, redirect } from "react-router";

export async function clientLoader() {
    const cached = authService.getToken();
    if (cached) {
        const decoded = authService.decodeAuthToken(cached);
        return decoded
    }
    const token = authService.getToken()
    if (!token) return redirect("/auth/login")
}

export default function RootLayout() {
    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <main className="h-full">
                <Outlet />
            </main>
        </div >
    )
}
