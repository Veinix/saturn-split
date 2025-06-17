import Navbar from "@app/Components/LayoutArea/Navbar";
import { tokenUtils } from "@app/Utilities/AuthUtilities";
import { Outlet } from "react-router";

export async function clientLoader() {
    // 1️⃣ Check if token is cached
    const cached = tokenUtils.getToken();
    if (cached) {
        const decoded = tokenUtils.decodeAuthToken(cached);
        return decoded
    }
    // 2️⃣ Fallback to network

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
