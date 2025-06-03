import { Outlet } from "react-router";
import NavIcon from "~/Components/NavIcon";

export default function RootLayout() {
    return (
        <div className='min-h-screen flex flex-col'>
            {/* Navbar */}
            <nav
                className=" 
                w-full bg-amber-700 fixed bottom-0 left-0 flex justify-between h-20 items-center px-10 md:gap-10
                md:static md:top-0 md:justify-start z-50">
                {/* Mobile: icons, Desktop: words */}
                <NavIcon
                    href="/"
                    icon={"🏠"}
                    label="Home">
                </NavIcon>

                <NavIcon
                    href="/groups"
                    icon={"👥"}
                    label="Groups">
                </NavIcon>
                <NavIcon
                    href="/profile"
                    icon={"👤"}
                    label="Profile">
                </NavIcon>
            </nav>
            <main className="p-5">
                <Outlet />
            </main>
        </div >
    )
}
