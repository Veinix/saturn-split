import LoadingScreen from "@app/Components/General/LoadingScreen";
import Navbar from "@app/Components/LayoutArea/Navbar";
import appConfig from "@app/Utilities/AppConfig";
import { useLayoutEffect, useState } from "react";
import { Outlet, useNavigate, type Session } from "react-router";



export default function RootLayout() {
    const navigate = useNavigate();
    const [initialized, setInitialized] = useState(false);

    useLayoutEffect(() => {
        setInitialized(false);
        const tokenStr = localStorage.getItem(appConfig.localStorageJWTKey);
        if (!tokenStr) {
            navigate("/auth/login", { replace: true });
            return
        }
        setInitialized(true);
    }, [navigate]);

    if (!initialized) return <LoadingScreen />;

    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <main className="h-full">
                <Outlet />
            </main>
        </div >
    )
}
