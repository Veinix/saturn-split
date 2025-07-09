import LoadingScreen from "@app/Components/General/LoadingScreen";
import appConfig from "@app/Utilities/AppConfig";
import { useState, useLayoutEffect } from "react";
import { Outlet, redirect, useNavigate } from "react-router";



export default function AuthLayout() {
    const navigate = useNavigate();
    const [initialized, setInitialized] = useState(false);

    useLayoutEffect(() => {
        setInitialized(false);
        const tokenStr = localStorage.getItem(appConfig.localStorageJWTKey);
        if (tokenStr) {
            navigate("/", { replace: true });
            return
        }
        setInitialized(true);
    }, [navigate]);

    if (!initialized) return <LoadingScreen />;
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-10/12 h-10/12 md:w-1/3 md:h-1/3 flex flex-col border-amber-600 border rounded-2xl items-center">
                <Outlet />
            </div>
        </div>
    )
}

