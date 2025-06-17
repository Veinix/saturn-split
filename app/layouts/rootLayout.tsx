import Navbar from "@app/Components/LayoutArea/Navbar";
import { tokenUtils } from "@app/Utilities/AuthUtilities";
import { Outlet, redirect } from "react-router";

export async function clientLoader() {
    const token = tokenUtils.getToken()
    if (!token) {
        throw redirect("/")
    }
}

export default function RootLayout() {

    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div >
    )
}
