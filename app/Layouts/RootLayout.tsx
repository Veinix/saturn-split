import LoadingScreen from "@app/Components/General/LoadingScreen";
import Navbar from "@app/Components/LayoutArea/Navbar";
import appConfig from "@app/Utilities/AppConfig";
import { useLayoutEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";



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
            {appConfig.currentEnvironment === "development" &&
                <div className="absolute top-0 right-0 border border-red-500 w-fit h-fit p-3 z-3 bg-red-500 text-white">
                    <p className="">{appConfig.currentEnvironment.toLocaleUpperCase()}</p>
                </div>
            }
            <Navbar />
            <main className="h-full">
                <Outlet />
            </main>
        </div >
    )
}
