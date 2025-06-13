import Navbar from "@app/Components/LayoutArea/Navbar";
import AuthProvider from "@app/Context/authContext";
import { Outlet } from "react-router";


export default function RootLayout() {
    return (
        <AuthProvider>
            <div className='min-h-screen flex flex-col'>
                <Navbar />
                <main>
                    <Outlet />
                </main>
            </div >
        </AuthProvider>
    )
}
