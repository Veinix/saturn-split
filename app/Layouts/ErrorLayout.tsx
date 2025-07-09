import { Outlet } from "react-router"

export default function ErrorLayout() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Outlet />
        </div>
    )
}

