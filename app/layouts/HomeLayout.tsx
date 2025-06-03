import { Outlet } from "react-router"

function HomeLayout() {
    return (
        <div className="">
            <Outlet />
        </div>
    )
}

export default HomeLayout