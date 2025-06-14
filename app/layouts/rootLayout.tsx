import Navbar from "@app/Components/LayoutArea/Navbar";
import { useAuth } from "@app/Hooks/useAuth";
import { Outlet } from "react-router";


export default function RootLayout() {
    const { session } = useAuth()
    if (!session) return null
    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div >
    )
}
