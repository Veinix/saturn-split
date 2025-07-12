
import NavIcon from "../NavIcon"

export default function Navbar() {

    return (
        <nav
            className=" 
                w-screen bg-orange-500 fixed bottom-0 left-0 flex justify-between h-20 items-center px-10 md:gap-10
                md:static md:top-0 md:justify-start z-2">
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
                href="/people"
                icon={"👤"}
                label="People">
            </NavIcon>
            <NavIcon
                href="/profile"
                icon={"👦"}
                label="Profile">
            </NavIcon>
        </nav>
    )
}
