import { Outlet } from "react-router";
import Navbar from "~/Components/LayoutArea/Navbar";
import { AuthProvider } from "~/Context/authContext";

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
